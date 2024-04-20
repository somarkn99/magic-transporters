import mongoose from 'mongoose';

/**
 * Schema definition for the 'Mover' model.
 * This schema defines the structure and constraints of Mover documents within MongoDB,
 * including validation requirements, default values, and indexes to optimize queries.
 */
const moverSchema = new mongoose.Schema({
  weightLimit: {
    type: Number,  // Data type for the maximum weight the mover can handle.
    required: [true, "Weight limit is required"],  // This field is mandatory.
    min: [1, "Weight limit must be at least 1"]  // Ensures the weight limit is positive.
  },
  energy: {
    type: Number,  // Data type for energy level of the mover.
    required: [true, "Energy is required"],  // This field is mandatory.
    min: [1, "Energy must be at least 1"]  // Ensures the energy level is positive.
  },
  state: {
    type: String,  // Data type for the operational state of the mover.
    enum: ['resting', 'loading', 'on a mission', 'done'],  // Allowed values for the state.
    default: 'resting'  // Default state of the mover when no specific state is provided.
  },
  currentLoad: {
    type: Number,  // Data type for the current load carried by the mover.
    default: 0,  // Default load is 0.
    min: [0, "Current load cannot be negative"]  // Prevents negative values for load.
  },
  missionsCompleted: {
    type: Number,  // Data type for counting completed missions.
    default: 0,  // Default number of completed missions.
    min: [0, "Missions completed cannot be negative"]  // Ensures count is non-negative.
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields to the document.
});

// Indexes
moverSchema.index({ state: 1 });  // Index on 'state' to optimize queries filtering by state.
moverSchema.index({ missionsCompleted: -1 });  // Descending index on 'missionsCompleted' to optimize sorting by completed missions.

// Pre-save hook
moverSchema.pre('save', function(next) {
  // Validation to ensure current load does not exceed weight limit before saving.
  if (this.currentLoad > this.weightLimit) {
    next(new Error('Current load cannot exceed weight limit'));
  } else {
    next();
  }
});

// Exporting the Mover model from the schema definition.
export const Mover = mongoose.model('Mover', moverSchema);
