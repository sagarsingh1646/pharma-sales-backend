const express = require("express");
const router = express.Router();
const authRoutes = require('./authRoutes');
const salesRoutes = require('./salesRoutes')

router.use('/auth', authRoutes); //All auth routes
router.use('/sales', salesRoutes); //Sales Routes

module.exports = router