const Sale = require('../models/saleModel');

// Create a new sale
exports.createSale = async (req, res, next) => {

  try {
    const { productName, quantity, dateOfSale, customerName, customerEmail } = req.body;

    const sale = await Sale.create({
      productName,
      quantity,
      dateOfSale,
      customerName,
      customerEmail,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, sale });
  } catch (err) {
    next(err);
  }
};

// Get sales based on role
exports.getSales = async (req, res, next) => {
  try {
    let sales;

    if (req.user.role === 'manager') {
      // Manager sees all sales
      sales = await Sale.find().populate('createdBy', 'firstName lastName email');
    } else {
      // Sales rep sees only their own sales
      sales = await Sale.find({ createdBy: req.user.id });
    }

    res.status(200).json({ success: true, sales });
  } catch (err) {
    next(err);
  }
};

// Update sale
exports.updateSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    if (!sale.createdBy.equals(req.user.id) && req.user.role !== 'manager')
      return res.status(403).json({ success: false, message: 'Not authorized' });

    Object.assign(sale, req.body);
    await sale.save();

    res.status(200).json({ success: true, sale });
  } catch (err) {
    next(err);
  }
};

// Delete sale
exports.deleteSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    if (!sale.createdBy.equals(req.user.id) && req.user.role !== 'manager')
      return res.status(403).json({ success: false, message: 'Not authorized' });

    await sale.deleteOne();
    res.status(200).json({ success: true, message: 'Sale deleted' });
  } catch (err) {
    next(err);
  }
};

// Generate sales report (manager only)
exports.generateReport = async (req, res, next) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const report = await Sale.aggregate([
      {
        $group: {
          _id: '$productName',
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]);

    res.status(200).json({ success: true, report });
  } catch (err) {
    next(err);
  }
};
