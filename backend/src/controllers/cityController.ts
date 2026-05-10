import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const { region, search } = req.query;
    const cities = await prisma.city.findMany({
      where: {
        region: region ? (region as string) : undefined,
        OR: search ? [
          { name: { contains: search as string, mode: 'insensitive' } },
          { country: { contains: search as string, mode: 'insensitive' } }
        ] : undefined
      },
      orderBy: { popularity_score: 'desc' }
    });
    res.status(200).json(cities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await prisma.city.findUnique({
      where: { id },
      include: { activities: true }
    });

    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.status(200).json(city);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
