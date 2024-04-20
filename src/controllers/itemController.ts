import { Request, Response } from 'express';
import itemService from '../services/itemService';
import { ItemDTO, PaginationParams } from '../interfaces/DTOs/ItemDTO';

export const addItem = async (req: Request<{}, {}, ItemDTO>, res: Response) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getItems = async (req: Request<{}, {}, {}, PaginationParams>, res: Response) => {
  try {
    const page =req.query.page || 1;
    const limit = req.query.limit || 10;

    const result = await itemService.getAllItems({ page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    res.json({ message: 'Item successfully deleted', item });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
