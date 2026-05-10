import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const totalTrips = await prisma.trip.count({ where: { user_id: userId } });
    
    const upcomingTrips = await prisma.trip.findMany({
      where: {
        user_id: userId,
        start_date: { gte: new Date() }
      },
      orderBy: { start_date: 'asc' },
      take: 5
    });

    const budgets = await prisma.budget.findMany({
      where: {
        trip: { user_id: userId }
      }
    });

    const totalBudgeted = budgets.reduce((acc, b) => acc + b.amount, 0);
    const totalSpent = budgets.reduce((acc, b) => acc + b.spent_amount, 0);

    const recentActivity = await prisma.trip.findMany({
      where: { user_id: userId },
      orderBy: { updated_at: 'desc' },
      take: 10
    });

    res.status(200).json({
      stats: {
        totalTrips,
        totalBudgeted,
        totalSpent,
        budgetUtilization: totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0
      },
      upcomingTrips,
      recentActivity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
