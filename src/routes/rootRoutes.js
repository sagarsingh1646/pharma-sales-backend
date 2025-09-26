const express = require("express");
const router = express.Router();
const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');
// const salesRoutes = require('./saRoutes')

router.use('/auth', authRoutes); //All auth routes
// router.use('/users', userRoutes); //Users routes
// router.use('/sales', salesRoutes); //Sales Routes

module.exports = router