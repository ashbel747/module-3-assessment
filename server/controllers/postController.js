const Post = require('../model/Post');
const User = require('../model/userModel');
const mongoose = require('mongoose');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, summary, content, image } = req.body;
    const userId = req.user.id;

    const newPost = new Post({ title, summary, content, image, author: userId });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if user is the post owner
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error('UPDATE POST ERROR:', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
};


// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the owner
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};



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

// @desc    Get a single post by ID (with author and comments)
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment views
      { new: true }
    )
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error('GET POST BY ID ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addCommentToPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      user: req.user.id,
      text,
    };

    post.comments.unshift(newComment); // add newest comment first
    await post.save();

    const updatedPost = await Post.findById(id)
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar');

    res.status(201).json(updatedPost);
  } catch (err) {
    console.error('ADD COMMENT ERROR:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};



// @desc    Get posts of currently logged-in user
// @route   GET /api/posts/mine
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id; // set by protect middleware
    const posts = await Post.find({ author: userId }).populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    console.error('GET MY POSTS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch your posts' });
  }
};


module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getMyPosts,
  getPostById,
  addCommentToPost,
};