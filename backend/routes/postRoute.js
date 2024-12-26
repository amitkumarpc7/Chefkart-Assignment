const express = require("express");
const {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

// for fetching all posts
router.get("/", getAllPosts);

// for creating new post
router.post("/", createPost);

// for editing existing post byID
router.put("/:id", editPost);

// for deleting a post byID
router.delete("/:id", deletePost);

module.exports = router;
