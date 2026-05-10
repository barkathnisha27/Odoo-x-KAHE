import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

export const shareTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: trip_id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const slug = uuidv4().split('-')[0]; // Simple unique slug

    const shared = await prisma.sharedTrip.create({
      data: {
        trip_id,
        slug
      }
    });

    // Also mark trip as public
    await prisma.trip.update({
      where: { id: trip_id },
      data: { visibility: 'public' }
    });

    res.status(201).json(shared);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSharedTrip = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const shared = await prisma.sharedTrip.findUnique({
      where: { slug },
      include: {
        trip: {
          include: {
            stops: { include: { city: true, activities: { include: { activity: true } } } },
            budgets: true,
            user: { select: { name: true, email: true } }
          }
        }
      }
    });

    if (!shared) {
      return res.status(404).json({ error: 'Shared trip not found' });
    }

    res.status(200).json(shared.trip);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
