const Sale = require('../../models/saleModel');
const User = require('../models/useModel');

// Create a new sale
exports.createSale = async (req, res, next) => {
  try {
    const { productName, quantity, dateOfSale, customerName, customerContact } = req.body;

    const sale = await Sale.create({
      productName,
      quantity,
      dateOfSale: dateOfSale || Date.now(),
      customerName,
      customerContact,
      createdBy: req.user.id, 
    });

    res.status(201).json({ success: true, sale });
  } catch (err) {
    next(err);
  }
};

// Get all sales - manager or own sales - rep
exports.getSales = async (req, res, next) => {
  try {
    let sales;
    if (req.user.role === 'manager') {
      sales = await Sale.find().populate('createdBy', 'firstName lastName email role');
    } else {
      sales = await Sale.find({ createdBy: req.user.id });
    }
    res.status(200).json({ success: true, sales });
  } catch (err) {
    next(err);
  }
};

// Update a sale
exports.updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);

    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    if (sale.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    Object.assign(sale, req.body);
    await sale.save();

    res.status(200).json({ success: true, sale });
  } catch (err) {
    next(err);
  }
};

// Delete a sale
exports.deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);

    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    if (sale.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await sale.deleteOne();
    res.status(200).json({ success: true, message: 'Sale deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Generate simple sales report - manager
exports.getReport = async (req, res, next) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const sales = await Sale.find().populate('createdBy', 'firstName lastName email role');


    const totalSales = sales.length;
    const totalQuantity = sales.reduce((sum, s) => sum + s.quantity, 0);

    res.status(200).json({
      success: true,
      totalSales,
      totalQuantity,
      sales,
    });
  } catch (err) {
    next(err);
  }
};
