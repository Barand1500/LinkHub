const Link = require('../models/Link');
const Category = require('../models/Category');

// @desc    Get all links for a category
// @route   GET /api/links/category/:categoryId
// @access  Private
exports.getLinks = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

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

    const links = await Link.find({ category: req.params.categoryId })
      .sort('order');

    res.status(200).json({
      success: true,
      count: links.length,
      data: links
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Get single link
// @route   GET /api/links/:id
// @access  Private
exports.getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link bulunamadı'
      });
    }

    // Check ownership
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    res.status(200).json({
      success: true,
      data: link
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Create new link
// @route   POST /api/links
// @access  Private
exports.createLink = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

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

    req.body.user = req.user.id;

    // Get the highest order value
    const lastLink = await Link.findOne({ category: req.body.category })
      .sort('-order');
    req.body.order = lastLink ? lastLink.order + 1 : 0;

    const link = await Link.create(req.body);

    res.status(201).json({
      success: true,
      data: link
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Update link
// @route   PUT /api/links/:id
// @access  Private
exports.updateLink = async (req, res) => {
  try {
    let link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link bulunamadı'
      });
    }

    // Check ownership
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    link = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: link
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Delete link
// @route   DELETE /api/links/:id
// @access  Private
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link bulunamadı'
      });
    }

    // Check ownership
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    await link.deleteOne();

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

// @desc    Track link click
// @route   POST /api/links/:id/click
// @access  Public
exports.trackClick = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link bulunamadı'
      });
    }

    link.clickCount += 1;
    await link.save();

    res.status(200).json({
      success: true,
      data: { clickCount: link.clickCount }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Reorder links
// @route   PUT /api/links/reorder
// @access  Private
exports.reorderLinks = async (req, res) => {
  try {
    const { links } = req.body; // Array of { id, order }

    if (!links || !Array.isArray(links)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz veri formatı'
      });
    }

    // Update each link's order
    const updatePromises = links.map(item => 
      Link.findOneAndUpdate(
        { _id: item.id, user: req.user.id },
        { order: item.order }
      )
    );

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: 'Sıralama güncellendi'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};
