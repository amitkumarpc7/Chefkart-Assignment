const Post = require("../models/Post");
const User = require("../models/User");

// for fetching All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name mobileNumber");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For Creating Post
const createPost = async (req, res) => {
  const { userId, title, description, images } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    const newPost = new Post({ title, description, userId, images });

    await newPost.save();
    user.postCount += 1;
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// for Editing Post
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not Found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// for deleting Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const user = await User.findById(post.userId);
    if (user) {
      user.postCount -= 1;
      await user.save();
    }
    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost, editPost, deletePost };
