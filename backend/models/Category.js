const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Kategori adı gerekli'],
    trim: true,
    maxlength: [100, 'Kategori adı 100 karakterden uzun olamaz']
  },
  description: {
    type: String,
    maxlength: [300, 'Açıklama 300 karakterden uzun olamaz'],
    default: ''
  },
  icon: {
    type: String,
    default: '📁'
  },
  color: {
    type: String,
    default: '#8b5cf6' // violet-500
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  bank: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bank',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for links
CategorySchema.virtual('links', {
  ref: 'Link',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

// Cascade delete links when a category is deleted
CategorySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  await this.model('Link').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
