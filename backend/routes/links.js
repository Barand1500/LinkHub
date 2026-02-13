const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getLinks,
  getLink,
  createLink,
  updateLink,
  deleteLink,
  trackClick,
  reorderLinks
} = require('../controllers/linkController');

// Public route for tracking clicks
router.post('/:id/click', trackClick);

// Protected routes
router.get('/category/:categoryId', protect, getLinks);
router.put('/reorder', protect, reorderLinks);

router
  .route('/')
  .post(protect, createLink);

router
  .route('/:id')
  .get(protect, getLink)
  .put(protect, updateLink)
  .delete(protect, deleteLink);

module.exports = router;
