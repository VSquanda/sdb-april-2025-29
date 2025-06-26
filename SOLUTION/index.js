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
    const data = await fs.readFile(DATA_FILE, "utf8");
    const blogData = JSON.parse(data);
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
    const data = await fs.readFile(DATA_FILE, "utf8");
    const blogData = JSON.parse(data);
    const postId = parseInt(req.params.id);

    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(blogData.blogPosts[postId]);
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
    const { blogTitle, blogContent, blogAuthor, createdAt } = req.body;

    // Basic validation
    if (!blogTitle || !blogContent || !blogAuthor || !createdAt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let blogData;
    try {
      const data = await fs.readFile(DATA_FILE, "utf8");
      blogData = JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        blogData = { blogPosts: [] };
      } else {
        throw error;
      }
    }

    const newPost = {
      blogTitle,
      blogContent,
      blogAuthor,
      createdAt,
    };

    blogData.blogPosts.push(newPost);
    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
      id: blogData.blogPosts.length - 1,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT - /api/posts/:id - update existing blog post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const blogData = JSON.parse(data);
    const postId = parseInt(req.params.id);

    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { blogTitle, blogContent, blogAuthor, createdAt } = req.body;

    // Basic validation
    if (!blogTitle || !blogContent || !blogAuthor || !createdAt) {
      return res.status(400).json({ error: "All fields are required" });
    }

    blogData.blogPosts[postId] = {
      blogTitle,
      blogContent,
      blogAuthor,
      createdAt,
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));

    res.json({
      message: "Post updated successfully",
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

// DELETE blog post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    const blogData = JSON.parse(data);
    const postId = parseInt(req.params.id);

    if (postId < 0 || postId >= blogData.blogPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }

    const deletedPost = blogData.blogPosts.splice(postId, 1)[0];
    await fs.writeFile(DATA_FILE, JSON.stringify(blogData, null, 2));

    res.json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Failed to delete post" });
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
