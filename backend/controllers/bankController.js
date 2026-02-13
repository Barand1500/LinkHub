const Bank = require('../models/Bank');
const Category = require('../models/Category');

// @desc    Get all banks for user
// @route   GET /api/banks
// @access  Private
exports.getBanks = async (req, res) => {
  try {
    const banks = await Bank.find({ user: req.user.id })
      .populate({
        path: 'categories',
        select: 'name icon'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: banks.length,
      data: banks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Get single bank
// @route   GET /api/banks/:id
// @access  Private
exports.getBank = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id).populate({
      path: 'categories',
      select: 'name description icon color slug viewCount order',
      options: { sort: { order: 1 } }
    });

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: 'Banka bulunamadı'
      });
    }

    // Make sure user owns the bank
    if (bank.user.toString() !== req.user.id && !bank.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    res.status(200).json({
      success: true,
      data: bank
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Create new bank
// @route   POST /api/banks
// @access  Private
exports.createBank = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const bank = await Bank.create(req.body);

    res.status(201).json({
      success: true,
      data: bank
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Update bank
// @route   PUT /api/banks/:id
// @access  Private
exports.updateBank = async (req, res) => {
  try {
    let bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: 'Banka bulunamadı'
      });
    }

    // Make sure user owns the bank
    if (bank.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    bank = await Bank.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: bank
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// @desc    Delete bank
// @route   DELETE /api/banks/:id
// @access  Private
exports.deleteBank = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: 'Banka bulunamadı'
      });
    }

    // Make sure user owns the bank
    if (bank.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Delete all categories and links in this bank
    await Category.deleteMany({ bank: bank._id });
    await bank.deleteOne();

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
