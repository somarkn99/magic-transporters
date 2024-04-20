import { Request, Response } from 'express';
import moverService from '../services/moverService';
import { Mover } from '../models/Mover';

/**
 * Creates a new mover in the database.
 * @param {Request} req - The request object containing data for creating a mover.
 * @param {Response} res - The response object used to return the newly created mover.
 */
export const addMover = async (req: Request, res: Response) => {
  try {
    const mover = await moverService.createMover(req.body);
    res.status(201).json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Retrieves a paginated list of movers.
 * @param {Request} req - The request object containing pagination options.
 * @param {Response} res - The response object used to return the paginated list of movers.
 */
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

/**
 * Loads a mover with an item, updating its current load.
 * @param {Request} req - The request object containing the mover's ID and the item details.
 * @param {Response} res - The response object used to return the updated mover.
 */
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

/**
 * Starts a mission for a specified mover.
 * @param {Request} req - The request object containing the mover's ID.
 * @param {Response} res - The response object used to return the mover now on a mission.
 */
export const startMission = async (req: Request, res: Response) => {
  const { id: moverId } = req.params;
  try {
    const mover = await moverService.startMission(moverId);
    res.json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Ends a mission for a specified mover, resetting its load.
 * @param {Request} req - The request object containing the mover's ID.
 * @param {Response} res - The response object used to return the mover now off mission.
 */
export const endMission = async (req: Request, res: Response) => {
  const { id: moverId } = req.params;

  try {
    const mover = await moverService.endMission(moverId);
    res.json(mover);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Lists all movers sorted by the number of completed missions.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to return the sorted list of movers.
 */
export const listCompletedMissions = async (req: Request, res: Response) => {
  try {
    const movers = await Mover.find({}).sort({ missionsCompleted: -1 });
    res.json(movers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
