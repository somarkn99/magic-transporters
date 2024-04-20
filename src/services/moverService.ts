import { Mover } from '../models/Mover';

// Define the data structure for creating a new mover.
interface MoverInput {
  weightLimit: number;
  energy: number;
}

/**
 * Service class for handling operations related to Movers.
 */
class MoverService {
  /**
   * Creates a new mover with the specified details.
   * @param {MoverInput} data - The input data for creating a mover.
   * @returns {Promise<Mover>} The newly created mover object after it is saved to the database.
   * @throws {Error} If there is an error during the creation process.
   */
  async createMover(data: MoverInput) {
    try {
      const newMover = new Mover(data);
      await newMover.save();
      return newMover.toObject();
    } catch (error) {
      throw new Error('Error creating Mover');
    }
  }

  /**
   * Retrieves all movers with pagination.
   * @param {number} page - The page number for pagination.
   * @param {number} limit - The number of movers per page.
   * @returns {Promise<Object>} An object containing an array of movers and the total count.
   */
  async getAllMovers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return {
      movers: await Mover.find().limit(limit).skip(skip).lean(),
      total: await Mover.countDocuments()
    };
  }

  /**
   * Loads a specific mover with an item, updating its current load.
   * @param {string} moverId - The ID of the mover.
   * @param {string} itemId - The ID of the item to be loaded.
   * @param {number} itemWeight - The weight of the item to be added to the current load.
   * @returns {Promise<Mover>} The updated mover.
   * @throws {Error} If the mover is not found or if the new load exceeds the weight limit.
   */
  async loadMover(moverId: string, itemId: string, itemWeight: number) {
    const mover = await Mover.findById(moverId);
    if (!mover) {
      throw new Error('Mover not found');
    }
    if (mover.currentLoad + itemWeight > mover.weightLimit) {
      throw new Error('Exceeding weight limit');
    }
    mover.currentLoad += itemWeight;
    await mover.save();
    return mover;
  }

  /**
   * Starts a mission for a specific mover.
   * @param {string} moverId - The ID of the mover to start the mission.
   * @returns {Promise<Mover>} The mover with updated state.
   * @throws {Error} If the mover is not found or is not in a 'loading' state.
   */
  async startMission(moverId: string) {
    const mover = await Mover.findById(moverId);
    if (!mover) {
      throw new Error('Mover not found');
    }
    if (mover.state !== 'loading') {
      throw new Error('Mover is not ready to start a mission');
    }
    mover.state = 'on a mission';
    await mover.save();
    return mover;
  }

  /**
   * Ends a mission for a specific mover, resetting its load and updating missions completed.
   * @param {string} moverId - The ID of the mover to end the mission.
   * @returns {Promise<Mover>} The updated mover.
   * @throws {Error} If the mover is not found.
   */
  async endMission(moverId: string) {
    const mover = await Mover.findById(moverId);
    if (!mover) {
      throw new Error('Mover not found');
    }
    mover.state = 'done';
    mover.currentLoad = 0;
    mover.missionsCompleted += 1;
    await mover.save();
    return mover;
  }
}

/**
 * Export a singleton instance of the MoverService to ensure consistent state and behavior across the application.
 */
export default new MoverService();
