import express from 'express';
import { addItem, getItems, getItem, updateItem, deleteItem } from '../controllers/itemController';

const router = express.Router();

router.post('/', addItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
