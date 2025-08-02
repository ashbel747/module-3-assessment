const Post = require('../model/Post');
const User = require('../model/userModel');
const mongoose = require('mongoose');

// @desc    Get all posts 
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorInfo',
        },
      },
      { $unwind: '$authorInfo' },
      {
        $project: {
          title: 1,
          summary: 1,
          content: 1,
          image: 1,
          createdAt: 1,
          likesCount: { $size: { $ifNull: ['$likes', []] } },
          commentsCount: { $size: { $ifNull: ['$comments', []] } },
          author: {
            name: '$authorInfo.username',
            avatar: '$authorInfo.avatar',
          },
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = {
  getPosts
};