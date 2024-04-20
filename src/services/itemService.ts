import { Item } from '../models/Item';
import { MagicItem } from '../interfaces/MagicItem';
import { ItemDTO, PaginatedResult, PaginationParams } from '../interfaces/DTOs/ItemDTO';

/**
 * Service class for handling business logic related to Item entities.
 */
class ItemService {
  /**
   * Creates a new item in the database.
   * @param {ItemDTO} data - Data transfer object containing item details.
   * @returns {Promise<MagicItem>} The created item after being saved to the database.
   * @throws {Error} When item creation fails.
   */
  async createItem(data: ItemDTO): Promise<MagicItem> {
    try {
      const newItem = new Item(data);
      await newItem.save();
      return newItem.toObject();
    } catch (error) {
      throw new Error('Error creating Item: ' + error.message);
    }
  }

  /**
   * Retrieves all items with pagination.
   * @param {PaginationParams} param0 - Object containing pagination parameters.
   * @returns {Promise<PaginatedResult<MagicItem>>} Paginated result of items.
   */
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

  /**
   * Retrieves a single item by its ID.
   * @param {string} itemId - The unique identifier of the item.
   * @returns {Promise<MagicItem>} The requested item.
   * @throws {Error} When the item is not found.
   */
  async getItemById(itemId: string): Promise<MagicItem> {
    const item = await Item.findById(itemId).lean();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  /**
   * Updates an existing item by its ID.
   * @param {string} itemId - The unique identifier of the item to update.
   * @param {MagicItem} data - New data for the item.
   * @returns {Promise<MagicItem>} The updated item.
   * @throws {Error} When the item to update is not found.
   */
  async updateItem(itemId: string, data: MagicItem): Promise<MagicItem> {
    const item = await Item.findByIdAndUpdate(itemId, data, { new: true }).lean();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  /**
   * Deletes an item by its ID.
   * @param {string} itemId - The unique identifier of the item to be deleted.
   * @returns {Promise<MagicItem>} The deleted item.
   * @throws {Error} When the item to be deleted is not found.
   */
  async deleteItem(itemId: string): Promise<MagicItem> {
    const item = await Item.findByIdAndDelete(itemId).lean();
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}

/**
 * Export a singleton instance of the ItemService to ensure all consumers
 * of the service interact with a consistent state of the service.
 */
export default new ItemService();
