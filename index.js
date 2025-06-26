const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve static files

// GET - /api/posts - get all blog posts
app.get("/api/posts", async (req, res) => {
  try {
    // Read the data file
    // Parse the JSON data
    // Respond with the blog posts
  } catch (error) {
    if (error.code === "ENOENT") {
      res.json([]);
    } else {
      res.status(500).json({ error: "Failed to read posts" });
    }
  }
});

// GET - /api/posts/:id - single blog post by index
app.get("/api/posts/:id", async (req, res) => {
  try {
    // Read the data file
    // Parse the JSON data
    // Get the post ID from the request parameters
    // Validate the post ID
    // Respond with the specific blog post
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Failed to read post" });
    }
  }
});

// POST - /api/posts - create new blog post
app.post("/api/posts", async (req, res) => {
  try {
    // Extract blog post data from the request body

    // Basic validation

    // Read existing blog data or initialize if file does not exist
    let blogData;

    // Attempt to read the data file
    try {
      // Read the data file
      // Parse the JSON data
    } catch (error) {
      if (error.code === "ENOENT") {
        blogData = { blogPosts: [] };
      } else {
        throw error;
      }
    }

    // Create a new blog post object
    const newPost = {};

    // Assign the blog post data to the new post object

    // Write the updated blog data back to the file

    // Respond with success message and the new post
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT - /api/posts/:id - update existing blog post
app.put("/api/posts/:id", async (req, res) => {
  try {
    // Read the data file

    // Parse the JSON data

    // Get the post ID from the request parameters

    // Validate the post ID
    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Extract blog post data from the request body

    // Basic validation
    if (!blogTitle || !blogContent || !blogAuthor || !createdAt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Update the specific blog post
    blogData.blogPosts[postId] = {};

    // Write the updated blog data back to the file

    // Respond with success message and the updated post
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Failed to update post" });
    }
  }
});

// DELETE - /api/posts/:id - delete blog post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    // Read the data file

    // Parse the JSON data

    // Get the post ID from the request parameters

    // Validate the post ID
    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the specific blog post

    // Write the updated blog data back to the file

    // Respond with success message and the deleted post
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Failed to delete post" });
    }
  }
});

// BONUS: Search blog posts by title
// GET - /api/posts/search - search blog posts by title
app.get("/api/posts/search", async (req, res) => {
  try {
    // Read the data file

    // Parse the JSON data

    // Get the search query from the request query parameters

    // Filter the blog posts by title

    // Respond with the filtered blog posts
    
  } catch (error) {
    if (error.code === "ENOENT") {
      res.json([]);
    } else {
      res.status(500).json({ error: "Failed to search posts" });
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Blog API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog API server running on http://localhost:${PORT}`);
});
