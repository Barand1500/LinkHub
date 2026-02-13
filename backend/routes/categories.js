const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  regenerateSlug
} = require('../controllers/categoryController');

// Public route for sharing
router.get('/share/:slug', getCategoryBySlug);

// Protected routes
router.get('/bank/:bankId', protect, getCategories);

router
  .route('/')
  .post(protect, createCategory);

router
  .route('/:id')
  .get(protect, getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

router.put('/:id/regenerate-slug', protect, regenerateSlug);

module.exports = router;
