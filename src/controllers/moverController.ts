import { Request, Response } from 'express';
import moverService from '../services/moverService';
import { Mover } from '../models/Mover';

export const addMover = async (req: Request, res: Response) => {
  try {
    const mover = await moverService.createMover(req.body);
    res.status(201).json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await moverService.getAllMovers(page, limit);
    res.json({
      data: result.movers,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loadMover = async (req: Request, res: Response) => {
  const { id: moverId } = req.params;
  const { itemId, weight } = req.body;

  try {
    const mover = await moverService.loadMover(moverId, itemId, weight);
    res.json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const startMission = async (req: Request, res: Response) => {
  const { id: moverId } = req.params;
  try {
    const mover = await moverService.startMission(moverId);
    res.json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const endMission = async (req: Request, res: Response) => {
  const { id: moverId } = req.params;

  try {
    const mover = await moverService.endMission(moverId);
    res.json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listCompletedMissions = async (req: Request, res: Response) => {
  try {
    const movers = await Mover.find({}).sort({ missionsCompleted: -1 });
    res.json(movers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
