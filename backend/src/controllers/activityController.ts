import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const { city_id, category, search } = req.query;
    const activities = await prisma.activity.findMany({
      where: {
        city_id: city_id ? (city_id as string) : undefined,
        category: category ? (category as string) : undefined,
        OR: search ? [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ] : undefined
      },
      include: { city: true },
      orderBy: { rating: 'desc' }
    });
    res.status(200).json(activities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { city_id, title, category, duration_minutes, price, rating, image_url, description } = req.body;
    const activity = await prisma.activity.create({
      data: {
        city_id,
        title,
        category,
        duration_minutes: duration_minutes || 60,
        price,
        rating: rating || 5.0,
        image_url,
        description
      }
    });
    res.status(201).json(activity);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
