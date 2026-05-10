import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getTripBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id } = req.query;
    const budgets = await prisma.budget.findMany({
      where: { trip_id: trip_id as string }
    });
    res.status(200).json(budgets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { trip_id, category, amount, spent_amount } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: trip_id } });
    if (!trip || trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const budget = await prisma.budget.upsert({
      where: {
        trip_id_category: {
          trip_id,
          category
        }
      },
      update: {
        amount,
        spent_amount
      },
      create: {
        trip_id,
        category,
        amount,
        spent_amount
      }
    });

    res.status(200).json(budget);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const budget = await prisma.budget.findUnique({
      where: { id },
      include: { trip: true }
    });

    if (!budget || budget.trip.user_id !== req.user?.id) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await prisma.budget.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
