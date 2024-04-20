import mongoose from 'mongoose';

/**
 * Schema definition for the 'Item' model.
 * This schema defines the structure of the 'Item' documents within the MongoDB database,
 * including field types, validation requirements, and indexing for optimized queries.
 */
const itemSchema = new mongoose.Schema({
  name: {
    type: String,  // Specifies the data type of the name field.
    required: [true, 'Item name is required'],  // Marks the name field as required with a custom error message.
    maxlength: [100, 'Name should not be more than 100 characters']  // Sets a maximum length for the name field.
  },
  weight: {
    type: Number,  // Specifies the data type of the weight field.
    required: [true, 'Weight is required'],  // Marks the weight field as required with a custom error message.
    min: [0, 'Weight must be a positive number']  // Sets a minimum value for the weight field.
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields to the model.
});

// Adds an index to the name field to improve the performance of queries involving the name.
itemSchema.index({ name: 1 });

// Creates the 'Item' model from the defined schema and exports it.
export const Item = mongoose.model('Item', itemSchema);
