import { Mover } from '../models/Mover';

interface MoverInput {
  weightLimit: number;
  energy: number;
}

class MoverService {
  async createMover(data: MoverInput) {
    try {
      const newMover = new Mover(data);
      await newMover.save();
      return newMover.toObject();
    } catch (error) {
      throw new Error('Error creating Mover');
    }
  }

  async getAllMovers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return {
      movers: await Mover.find().limit(limit).skip(skip).lean(),
      total: await Mover.countDocuments()
    };
  }  
  
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

export default new MoverService();
