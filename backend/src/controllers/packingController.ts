import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getPackingItems = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id } = req.query;
    const items = await prisma.packingItem.findMany({
      where: { trip_id: trip_id as string },
      orderBy: { created_at: 'asc' }
    });
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addPackingItem = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id, item_name, category } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: trip_id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const item = await prisma.packingItem.create({
      data: {
        trip_id,
        item_name,
        category
      }
    });

    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePackingItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { item_name, completed, category } = req.body;

    const item = await prisma.packingItem.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!item || item.trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updatedItem = await prisma.packingItem.update({
      where: { id },
      data: {
        item_name,
        completed,
        category
      }
    });

    res.status(200).json(updatedItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePackingItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.packingItem.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!item || item.trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await prisma.packingItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
