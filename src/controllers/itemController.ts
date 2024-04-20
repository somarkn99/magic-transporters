import { Request, Response } from 'express';
import itemService from '../services/itemService';
import { ItemDTO, PaginationParams } from '../interfaces/DTOs/ItemDTO';

/**
 * Creates a new item in the database.
 * @param {Request} req - The request object containing the item data.
 * @param {Response} res - The response object used to send back the newly created item.
 */
export const addItem = async (req: Request<{}, {}, ItemDTO>, res: Response) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Retrieves items with pagination.
 * @param {Request} req - The request object containing pagination parameters.
 * @param {Response} res - The response object used to send back the paginated list of items.
 */
export const getItems = async (req: Request<{}, {}, {}, PaginationParams>, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await itemService.getAllItems({ page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a single item by ID.
 * @param {Request} req - The request object containing the item's ID in the URL.
 * @param {Response} res - The response object used to send back the requested item.
 */
export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Updates an existing item.
 * @param {Request} req - The request object containing the updated data and the item's ID in the URL.
 * @param {Response} res - The response object used to send back the updated item.
 */
export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes an item by ID.
 * @param {Request} req - The request object containing the item's ID in the URL.
 * @param {Response} res - The response object used to confirm the deletion.
 */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    res.json({ message: 'Item successfully deleted', item });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
