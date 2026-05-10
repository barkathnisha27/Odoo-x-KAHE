import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getTripStops = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id } = req.query;
    const stops = await prisma.tripStop.findMany({
      where: { trip_id: trip_id as string },
      include: { city: true },
      orderBy: { order_index: 'asc' }
    });
    res.status(200).json(stops);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addTripStop = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id, city_id, day_number, arrival_date, departure_date, transport_mode, notes } = req.body;

    // Verify ownership
    const trip = await prisma.trip.findUnique({ where: { id: trip_id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const lastStop = await prisma.tripStop.findFirst({
      where: { trip_id },
      orderBy: { order_index: 'desc' }
    });

    const stop = await prisma.tripStop.create({
      data: {
        trip_id,
        city_id,
        day_number: day_number || 1,
        order_index: (lastStop?.order_index ?? -1) + 1,
        arrival_date: new Date(arrival_date),
        departure_date: new Date(departure_date),
        transport_mode: transport_mode || 'flight',
        notes
      },
      include: { city: true }
    });

    res.status(201).json(stop);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTripStop = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { day_number, arrival_date, departure_date, transport_mode, notes, order_index } = req.body;

    const stop = await prisma.tripStop.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!stop || stop.trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    const updatedStop = await prisma.tripStop.update({
      where: { id },
      data: {
        day_number,
        arrival_date: arrival_date ? new Date(arrival_date) : undefined,
        departure_date: departure_date ? new Date(departure_date) : undefined,
        transport_mode,
        notes,
        order_index
      },
      include: { city: true }
    });

    res.status(200).json(updatedStop);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTripStop = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const stop = await prisma.tripStop.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!stop || stop.trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    await prisma.tripStop.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
