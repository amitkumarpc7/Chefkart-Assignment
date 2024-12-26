const express = require("express");
const { getAllUsers, createUser } = require("../controllers/userController");
const router = express.Router();

// for fetching All users
router.get("/", getAllUsers);

// for creating new User
router.post("/", createUser);

module.exports = router;
