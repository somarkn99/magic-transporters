import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    maxlength: [100, 'Name should not be more than 100 characters']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0, 'Weight must be a positive number']
  }
}, {
  timestamps: true
});

itemSchema.index({ name: 1 });

export const Item = mongoose.model('Item', itemSchema);
