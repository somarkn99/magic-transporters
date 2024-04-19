import mongoose from 'mongoose';

const moverSchema = new mongoose.Schema({
  weightLimit: {
    type: Number,
    required: [true, "Weight limit is required"],
    min: [1, "Weight limit must be at least 1"]
  },
  energy: {
    type: Number,
    required: [true, "Energy is required"],
    min: [1, "Energy must be at least 1"]
  },
  state: {
    type: String,
    enum: ['resting', 'loading', 'on a mission', 'done'],
    default: 'resting'
  },
  currentLoad: {
    type: Number,
    default: 0,
    min: [0, "Current load cannot be negative"]
  },
  missionsCompleted: {
    type: Number,
    default: 0,
    min: [0, "Missions completed cannot be negative"]
  }
}, {
  timestamps: true,
});

moverSchema.index({ state: 1 });
moverSchema.index({ missionsCompleted: -1 });

moverSchema.pre('save', function(next) {
  if (this.currentLoad > this.weightLimit) {
    next(new Error('Current load cannot exceed weight limit'));
  } else {
    next();
  }
});

export const Mover = mongoose.model('Mover', moverSchema);
