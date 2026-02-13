const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/authController');

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('İsim gerekli')
    .isLength({ max: 50 })
    .withMessage('İsim 50 karakterden uzun olamaz'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email gerekli')
    .isEmail()
    .withMessage('Geçerli bir email adresi girin')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Şifre gerekli')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalı')
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email gerekli')
    .isEmail()
    .withMessage('Geçerli bir email adresi girin')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Şifre gerekli')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
