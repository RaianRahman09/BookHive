const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  progress: { type: Number, default: 0 },
  lastRead: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);