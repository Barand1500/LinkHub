const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank
} = require('../controllers/bankController');

router
  .route('/')
  .get(protect, getBanks)
  .post(protect, createBank);

router
  .route('/:id')
  .get(protect, getBank)
  .put(protect, updateBank)
  .delete(protect, deleteBank);

module.exports = router;
