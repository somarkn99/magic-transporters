import { Item } from '../models/Item';
import { MagicItem } from '../interfaces/MagicItem';
import { ItemDTO, PaginatedResult, PaginationParams } from '../interfaces/DTOs/ItemDTO';

class ItemService {
  async createItem(data: ItemDTO): Promise<MagicItem> {
    try {
      const newItem = new Item(data);
      await newItem.save();
      return newItem.toObject();
    } catch (error) {
      throw new Error('Error creating Item: ' + error.message);
    }
  }

  async getAllItems({ page, limit }: PaginationParams): Promise<PaginatedResult<MagicItem>> {
    const skip = (page - 1) * limit;
    const items = await Item.find().limit(limit).skip(skip).lean();
    const total = await Item.countDocuments();
    return {
      data: items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getItemById(itemId: string) {
    const item = await Item.findById(itemId).lean();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async updateItem(itemId: string, data: MagicItem) {
    const item = await Item.findByIdAndUpdate(itemId, data, { new: true }).lean();;
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async deleteItem(itemId: string) {
    const item = await Item.findByIdAndDelete(itemId).lean();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}

export default new ItemService();
