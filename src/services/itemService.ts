import { Item } from '../models/Item';
import { MagicItem } from '../interfaces/MagicItem';

class ItemService {
  async createItem(data: MagicItem) {
    try {
      const newItem = new Item(data);
      await newItem.save();
      return newItem.toObject();
    } catch (error) {
      throw new Error('Error creating Item: ' + error.message);
    }
  }

  async getAllItems(page = 1, limit = 10) {
    const skip = (page - 1) * limit; // Calculate the number of items to skip
    return {
      items: await Item.find().limit(limit).skip(skip).lean(),
      total: await Item.countDocuments() // Count total documents for pagination info
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
