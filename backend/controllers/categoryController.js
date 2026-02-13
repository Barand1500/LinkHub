const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Link = require('../models/Link');
const { customAlphabet } = require('nanoid');

// Generate unique slug
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

// @desc    Get all categories for a bank
// @route   GET /api/categories/bank/:bankId
// @access  Private
exports.getCategories = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.bankId);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: 'Banka bulunamadı'
      });
    }

    // Check ownership
    if (bank.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    const categories = await Category.find({ bank: req.params.bankId })
      .populate({
        path: 'links',
        select: 'title url icon order',
        options: { sort: { order: 1 } }
      })
      .sort('order');

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: 'links',
      options: { sort: { order: 1 } }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }

    // Check ownership
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Get category by slug (public share)
// @route   GET /api/categories/share/:slug
// @access  Public
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate({
        path: 'links',
        match: { isActive: true },
        options: { sort: { order: 1 } }
      })
      .populate('user', 'name avatar');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }

    if (!category.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Bu kategori herkese açık değil'
      });
    }

    // Increment view count
    category.viewCount += 1;
    await category.save();

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
exports.createCategory = async (req, res) => {
  try {
    const bank = await Bank.findById(req.body.bank);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: 'Banka bulunamadı'
      });
    }

    // Check ownership
    if (bank.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    req.body.user = req.user.id;
    req.body.slug = nanoid();

    // Get the highest order value
    const lastCategory = await Category.findOne({ bank: req.body.bank })
      .sort('-order');
    req.body.order = lastCategory ? lastCategory.order + 1 : 0;

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }

    // Check ownership
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Don't allow slug update
    delete req.body.slug;

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }

    // Check ownership
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Delete all links in this category
    await Link.deleteMany({ category: category._id });
    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Regenerate category slug
// @route   PUT /api/categories/:id/regenerate-slug
// @access  Private
exports.regenerateSlug = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori bulunamadı'
      });
    }

    // Check ownership
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    category.slug = nanoid();
    await category.save();

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};
