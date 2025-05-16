const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// POST: Save/Update Bookmark
router.post('/', async (req, res) => {
  try {
    const { userId, bookId, progress } = req.body;
    
    // Check for existing bookmark
    const existingBookmark = await Bookmark.findOne({ 
      userId: userId, 
      bookId: bookId 
    });

    if (existingBookmark) {
      // Update existing bookmark
      existingBookmark.progress = progress;
      existingBookmark.lastRead = Date.now();
      await existingBookmark.save();
      return res.status(200).json(existingBookmark);
    } else {
      // Create new bookmark
      const newBookmark = new Bookmark({ 
        userId: userId, 
        bookId: bookId, 
        progress: progress 
      });
      await newBookmark.save();
      return res.status(201).json(newBookmark);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: 'Failed to save progress' });
  }
});

// GET: Fetch Bookmarks by User
router.get('/:userId', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ 
      userId: req.params.userId 
    });
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
});

module.exports = router;