const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createSale,
  getSales,
  getMySales,
  updateSale,
  deleteSale,
  generateReport,
} = require("../controllers/salesController");

const requireAuth = passport.authenticate("jwt", { session: false });

// Create a new sale (sales rep)
router.post("/create", requireAuth, createSale);

// Get sales (manager/rep)
router.get("/", requireAuth, getSales);

// Update sale (sales rep can update own sale)
router.put("/:id", requireAuth, updateSale);

// Delete sale (sales rep can delete own sale)
router.delete("/:id", requireAuth, deleteSale);

// Generate sales report (manager only)
router.get("/report", requireAuth, generateReport);

module.exports = router;
