const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Link başlığı gerekli'],
    trim: true,
    maxlength: [150, 'Başlık 150 karakterden uzun olamaz']
  },
  url: {
    type: String,
    required: [true, 'URL gerekli'],
    match: [
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Geçerli bir URL girin'
    ]
  },
  description: {
    type: String,
    maxlength: [300, 'Açıklama 300 karakterden uzun olamaz'],
    default: ''
  },
  icon: {
    type: String,
    default: '🔗'
  },
  favicon: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add https if not present
LinkSchema.pre('save', function(next) {
  if (this.url && !this.url.match(/^https?:\/\//)) {
    this.url = 'https://' + this.url;
  }
  next();
});

module.exports = mongoose.model('Link', LinkSchema);
