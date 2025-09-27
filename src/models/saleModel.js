const mongoose = require('mongoose');

const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: [0, 'Price per unit must be at least 0'],
    },
    dateOfSale: {
      type: Date,
      required: true,
      default: Date.now,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Sale', SaleSchema);
