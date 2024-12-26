const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Successfully connected");
  } catch (e) {
    console.log("Error found ->", e);
  }
};
module.exports = connectDb;
