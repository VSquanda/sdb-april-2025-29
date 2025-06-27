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
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // Parse the JSON data
    const blogData = JSON.parse(data);
    // Respond with the blog posts
    res.json(blogData.blogPosts);
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
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // Parse the JSON data
    const blogData = JSON.parse(data);
    // Get the post ID from the request parameters
    const postId = parseInt(req.params.id);
    // Validate the post ID // Respond with the specific blog post
    if (postId < 0 || postId >= blogData.blogPosts.length)
      return res.status(404).json({ error: "Post Not Found." });
    blogData.blogPosts[postId - 1];
    console.log(blogData.blogPosts[postId - 1]);
    res.json(blogData.blogPosts[postId - 1]);
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
    const { blogTitle, blogContent, blogAuthor, createdAt } = req.body;
    // Basic validation
    if (!blogTitle || !blogContent || !blogAuthor || !createdAt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Read existing blog data or initialize if file does not exist
    let blogData;

    // Attempt to read the data file
    try {
      // Read the data file
      const data = await fs.readFile(DATA_FILE, "utf-8");
      // Parse the JSON data
      blogData = JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        blogData = { blogPosts: [] };
      } else {
        throw error;
      }
    }

    // Create a new blog post object
    const newPost = {
      blogTitle,
      blogContent,
      blogAuthor,
      createdAt,
    };

    // Assign the blog post data to the new post object
    blogData.blogPosts.push(newPost);
    // Write the updated blog data back to the file
    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));
    // Respond with success message and the new post
    res.status(201).json({ message: "Post Successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT - /api/posts/:id - update existing blog post
app.put("/api/posts/:id", async (req, res) => {
  try {
    // Read the data file
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // Parse the JSON data
    const blogData = JSON.parse(data);

    // Get the post ID from the request parameters
    const postId = parseInt(req.params.id);

    // Validate the post ID
    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Extract blog post data from the request body
    const { blogTitle, blogContent, blogAuthor, createdAt } = req.body;

    // Basic validation
    if (!blogTitle || !blogContent || !blogAuthor || !createdAt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Update the specific blog post
    blogData.blogPosts[postId] = {
      blogTitle,
      blogAuthor,
      blogContent,
      createdAt,
    };

    // Write the updated blog data back to the file
    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));
    // Respond with success message and the updated post
    res.json({
      message: "Update Successful",
      post: blogData.blogPosts[postId],
    });
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
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // Parse the JSON data
    const blogData = JSON.parse(data);
    // Get the post ID from the request parameters
    const postId = parseInt(req.params.id);
    // Validate the post ID
    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the specific blog post
    const deletedPost = blogData.blogPosts.splice(postId, (1)[0]);
    // Write the updated blog data back to the file
    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));
    // Respond with success message and the deleted post
    res.json({ message: "Delete Successful", post: deletedPost });
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
    const data = await fs.readFile(DATA_FILE, "utf-8");
    // Parse the JSON data
    const blogData = JSON.parse(data);
    // Get the search query from the request query parameters
    const searchQuery = req.query.blogTitle || "";
    // Filter the blog posts by title
    const filteredPosts = blogData.blogPosts.filter((post) => {
      post.blogTitle.toLowerCase().includes(searchQuery.toLowerCase());
    });
    // Respond with the filtered blog posts
    res.json(filteredPosts);
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
