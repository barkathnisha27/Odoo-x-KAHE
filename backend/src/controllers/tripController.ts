import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getAllTrips = async (req: AuthRequest, res: Response) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { user_id: req.user?.id },
      orderBy: { created_at: 'desc' }
    });
    res.status(200).json(trips);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          include: { city: true, activities: { include: { activity: true } } },
          orderBy: { order_index: 'asc' }
        },
        budgets: true,
        packing_items: true
      }
    });

    if (!trip || (trip.user_id !== req.user?.id && trip.visibility !== 'public')) {
      return res.status(404).json({ error: 'Trip not found or access denied' });
    }

    res.status(200).json(trip);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { title, start_date, end_date, description, destination, traveler_count, trip_type, visibility } = req.body;

    const trip = await prisma.trip.create({
      data: {
        user_id: req.user!.id,
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
        destination,
        traveler_count: traveler_count || 1,
        trip_type: trip_type || 'solo',
        visibility: visibility || 'private'
      }
    });

    res.status(201).json(trip);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, start_date, end_date, description, destination, traveler_count, status, trip_type, visibility } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        title,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined,
        description,
        destination,
        traveler_count,
        status,
        trip_type,
        visibility
      }
    });

    res.status(200).json(updatedTrip);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    await prisma.trip.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
