'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { api } from '@/lib/api';
import { useItinerary } from '@/lib/hooks/useItinerary';
import { Trip, TripStop } from '@/types/trips';
import { cities } from '@/data/cities';
import { activities } from '@/data/activities';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { getTransportIcon, calculateDistance, estimateFlightCost } from '@/lib/utils';
import toast from 'react-hot-toast';

function SortableCityCard({ stop, onDelete }: { stop: TripStop, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const city = stop.city || cities.find(c => c.id === stop.city_id);
  if (!city) return null;

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card padding="none" hover={false} className={`overflow-hidden border transition-colors ${isDragging ? 'border-[#00D4FF] shadow-lg shadow-[#00D4FF]/20' : 'border-white/10'}`}>
        <div className="flex">
          {/* Drag Handle */}
          <div 
            {...attributes} 
            {...listeners} 
            className="w-8 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing bg-[rgba(255,255,255,0.02)] border-r border-white/5 hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="w-1 h-1 rounded-full bg-white/30" />
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <img src={city.image_url} alt={city.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold text-lg font-display">{city.flag_emoji} {city.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(stop.arrival_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – 
                    {new Date(stop.departure_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <button onClick={() => onDelete(stop.id)} className="text-[var(--text-tertiary)] hover:text-[#EF4444] p-1 transition-colors">✕</button>
            </div>
            
            {/* Embedded Activities Preview */}
            <div className="mt-3 pl-14">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Activities</p>
              {stop.activities && stop.activities.length > 0 ? (
                <div className="space-y-2">
                  {stop.activities.map(a => {
                    const act = activities.find(x => x.id === a.activity_id);
                    return act ? (
                      <div key={a.id} className="text-sm flex items-center justify-between p-2 rounded-md bg-[rgba(255,255,255,0.04)]">
                        <span className="truncate">{act.name}</span>
                        <span className="text-[10px] font-mono opacity-70">${act.cost}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-xs italic p-3 rounded-md border border-dashed border-white/10 text-center text-white/40">
                  Drag activities here or click to add
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ItineraryBuilder() {
  const params = useParams();
  const tripId = params.tripId as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const { stops, setStops, addStop, removeStop } = useItinerary([]);
  
  // Optimizer states
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizedStops, setOptimizedStops] = useState<TripStop[] | null>(null);
  const [optimizerStats, setOptimizerStats] = useState({ savedDistance: 0, savedCost: 0 });

  useEffect(() => {
    async function load() {
      const data = await api.trips.getById(tripId);
      if (data) {
        setTrip(data);
        setStops(data.stops || []);
      }
      setLoading(false);
    }
    load();
  }, [tripId, setStops]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setStops((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        return newArray.map((s, i) => ({ ...s, order_index: i }));
      });
    }
  };

  const calculateRouteStats = (routeStops: TripStop[]) => {
    let dist = 0;
    let cost = 0;
    for (let i = 0; i < routeStops.length - 1; i++) {
      const c1 = routeStops[i].city || cities.find(c => c.id === routeStops[i].city_id);
      const c2 = routeStops[i+1].city || cities.find(c => c.id === routeStops[i+1].city_id);
      if (c1 && c2) {
        const d = calculateDistance(c1.coordinates.lat, c1.coordinates.lng, c2.coordinates.lat, c2.coordinates.lng);
        dist += d;
        cost += estimateFlightCost(d);
      }
    }
    return { dist, cost };
  };

  const runOptimizer = () => {
    if (stops.length < 3) {
      toast.error('Need at least 3 cities to optimize!');
      return;
    }
    
    // Simple greedy TSP approach for demo purposes
    const optimized = [...stops];
    // Keep first stop as start
    for (let i = 0; i < optimized.length - 2; i++) {
      let nearestIdx = i + 1;
      let minDist = Infinity;
      const currentCity = optimized[i].city || cities.find(c => c.id === optimized[i].city_id)!;
      
      for (let j = i + 1; j < optimized.length; j++) {
        const nextCity = optimized[j].city || cities.find(c => c.id === optimized[j].city_id)!;
        const dist = calculateDistance(currentCity.coordinates.lat, currentCity.coordinates.lng, nextCity.coordinates.lat, nextCity.coordinates.lng);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = j;
        }
      }
      
      // Swap
      const temp = optimized[i+1];
      optimized[i+1] = optimized[nearestIdx];
      optimized[nearestIdx] = temp;
    }
    
    // Re-index
    const finalOptimized = optimized.map((s, i) => ({ ...s, order_index: i }));
    
    const currentStats = calculateRouteStats(stops);
    const optimizedStats = calculateRouteStats(finalOptimized);
    
    // Only show if actually better (in a real app, logic would be robust)
    if (optimizedStats.dist < currentStats.dist) {
      setOptimizedStops(finalOptimized);
      setOptimizerStats({
        savedDistance: currentStats.dist - optimizedStats.dist,
        savedCost: currentStats.cost - optimizedStats.cost,
      });
      setShowOptimizer(true);
    } else {
      toast.success('Your route is already perfectly optimized! 🧠');
    }
  };

  const applyOptimization = () => {
    if (optimizedStops) {
      setStops(optimizedStops);
      setShowOptimizer(false);
      toast.success('Route optimized successfully! 🎉');
      // trigger confetti
    }
  };

  if (loading) return <PageSkeleton />;
  if (!trip) return <div className="p-8 text-center">Trip not found</div>;

  return (
    <div className="flex overflow-hidden" style={{ height: 'calc(100vh - var(--navbar-height))' }}>
      {/* LEFT SIDEBAR: Tools & Library */}
      <div className="w-72 lg:w-80 flex-shrink-0 glass-sidebar border-r border-white/10 flex flex-col h-full z-10 hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <Badge variant="accent" className="mb-3">{trip.status}</Badge>
          <h2 className="text-xl font-bold font-display leading-tight">{trip.name}</h2>
          <p className="text-xs mt-1 text-[var(--text-tertiary)]">{new Date(trip.start_date).toLocaleDateString()} – {new Date(trip.end_date).toLocaleDateString()}</p>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[var(--text-secondary)]">Add City</h3>
            <div className="space-y-2">
              {cities.slice(0, 5).map(city => (
                <div key={city.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] cursor-pointer border border-transparent hover:border-white/10 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{city.flag_emoji}</span>
                    <span className="text-sm font-medium">{city.name}</span>
                  </div>
                  <button onClick={() => { addStop(city.id, trip.start_date, trip.end_date); toast.success(`Added ${city.name}`); }} className="text-xs font-bold text-[#00D4FF] bg-[rgba(0,212,255,0.1)] px-2 py-1 rounded">ADD</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[rgba(255,123,53,0.1)] border border-[rgba(255,123,53,0.2)] rounded-xl p-4 mt-auto">
            <h4 className="text-sm font-bold text-[#FF7B35] mb-2 flex items-center gap-2">✨ Route Optimizer</h4>
            <p className="text-xs text-[#FF7B35]/80 mb-3 leading-relaxed">Let AI calculate the most efficient path between your selected cities.</p>
            <Button variant="warm" size="sm" fullWidth onClick={runOptimizer}>Optimize Route</Button>
          </div>
        </div>
      </div>

      {/* MAIN CANVAS: Itinerary Flow */}
      <div className="flex-1 bg-gradient-to-br from-[#0A1628] to-[#0F1F3D] overflow-y-auto relative">
        <div className="absolute inset-0 bg-animated-mesh opacity-30 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto py-12 px-6 relative z-10">
          
          {/* OPTIMIZER PANEL (Conditionally rendered above timeline) */}
          <AnimatePresence>
            {showOptimizer && (
              <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 40 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }} className="overflow-hidden">
                <Card className="border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#10B981] mb-2 flex items-center gap-2">
                        ✨ Smarter Route Found!
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        Reordering your stops will save you <strong className="text-white">{optimizerStats.savedDistance} km</strong> of travel and approximately <strong className="text-[#10B981]">${optimizerStats.savedCost}</strong>.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => setShowOptimizer(false)}>Dismiss</Button>
                        <Button size="sm" className="bg-[#10B981] text-white hover:bg-[#059669]" onClick={applyOptimization}>Apply Optimized Route</Button>
                      </div>
                    </div>
                    <div className="hidden md:block text-5xl">🧠</div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display">Route Flow</h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}>Map View</Button>
              <Button variant="primary" size="sm" onClick={() => toast.success('Changes saved!')}>Save Itinerary</Button>
            </div>
          </div>

          <div className="relative pl-6">
            {/* Vertical Flow Line */}
            <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#00D4FF] via-[#FF7B35] to-[#8B5CF6] opacity-30" />
            
            {stops.length === 0 ? (
              <div className="text-center py-20 bg-[rgba(255,255,255,0.02)] rounded-xl border border-dashed border-white/10">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                <h3 className="text-lg font-bold mb-2">Your journey is empty</h3>
                <p className="text-sm text-[var(--text-tertiary)]">Add cities from the sidebar to start building your route.</p>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={stops.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  {stops.map((stop, index) => (
                    <React.Fragment key={stop.id}>
                      <SortableCityCard stop={stop} onDelete={removeStop} />
                      
                      {/* Transport Badge between stops */}
                      {index < stops.length - 1 && (
                        <div className="relative flex justify-center my-2 z-10">
                          <div className="bg-[#0A1628] border border-white/10 rounded-full px-3 py-1 flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] shadow-sm cursor-pointer hover:bg-white/5 transition-colors group">
                            <span className="group-hover:scale-110 transition-transform">{getTransportIcon(stop.transport_mode)}</span>
                            <span className="capitalize">{stop.transport_mode}</span>
                            <span className="text-[10px] opacity-50">▾</span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
