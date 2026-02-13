const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Banka adı gerekli'],
    trim: true,
    maxlength: [100, 'Banka adı 100 karakterden uzun olamaz']
  },
  description: {
    type: String,
    maxlength: [500, 'Açıklama 500 karakterden uzun olamaz'],
    default: ''
  },
  icon: {
    type: String,
    default: '🔗'
  },
  color: {
    type: String,
    default: '#6366f1' // indigo-500
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for categories count
BankSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'bank',
  justOne: false
});

// Cascade delete categories when a bank is deleted
BankSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  await this.model('Category').deleteMany({ bank: this._id });
  next();
});

module.exports = mongoose.model('Bank', BankSchema);
