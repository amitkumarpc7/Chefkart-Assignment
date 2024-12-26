const express = require("express");
const connectDB = require("./database");
require("dotenv").config();
// routes
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");

const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send(
    "This is Amit's assignment. Follow the instructions provided in Readme.md from github"
  );
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// error handling for Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
