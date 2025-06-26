let blogData = { blogPosts: [] };

// Set current date/time as default
document.getElementById("createdAt").value = new Date()
  .toISOString()
  .slice(0, 16);

// Function to load posts from the server
async function loadPosts() {
  try {
    const response = await fetch("/api/posts");
    if (response.ok) {
      const posts = await response.json();
      blogData.blogPosts = posts;
      displayPosts();
    } else {
      console.error("Failed to load posts");
      document.getElementById("postsList").innerHTML =
        "<p>Failed to load posts</p>";
    }
  } catch (error) {
    console.error("Error loading posts:", error);
    document.getElementById("postsList").innerHTML =
      "<p>Error loading posts</p>";
  }
}

// Function to display existing posts
function displayPosts() {
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";

  if (blogData.blogPosts.length === 0) {
    postsList.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  blogData.blogPosts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
                    <h3>${post.blogTitle}</h3>
                    <div class="post-meta">
                        <strong>Author:</strong> ${post.blogAuthor} | 
                        <strong>Created:</strong> ${new Date(post.createdAt).toLocaleString()}
                    </div>
                    <div class="post-content">${post.blogContent.replace(/\n/g, "<br>")}</div>
                `;
    postsList.appendChild(postDiv);
  });
}

// Load posts on page load
loadPosts();

// Handle form submission
document
  .getElementById("blogForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      blogTitle: document.getElementById("blogTitle").value,
      blogContent: document.getElementById("blogContent").value,
      blogAuthor: document.getElementById("blogAuthor").value,
      createdAt: document.getElementById("createdAt").value,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        // Display success message in preview
        const preview = document.getElementById("preview");
        preview.innerHTML = `
                        <div style="color: green; margin-bottom: 10px;">✓ Post created successfully!</div>
                        <h3>${formData.blogTitle}</h3>
                        <p><strong>Author:</strong> ${formData.blogAuthor}</p>
                        <p><strong>Created:</strong> ${new Date(formData.createdAt).toLocaleString()}</p>
                        <div><strong>Content:</strong></div>
                        <p>${formData.blogContent.replace(/\n/g, "<br>")}</p>
                    `;

        document.getElementById("output").style.display = "block";

        // Reload posts from server to show the new post
        await loadPosts();

        // Clear the form
        document.getElementById("blogForm").reset();
        document.getElementById("createdAt").value = new Date()
          .toISOString()
          .slice(0, 16);
      } else {
        const error = await response.json();
        document.getElementById("preview").innerHTML =
          `<div style="color: red;">Error: ${error.error}</div>`;
        document.getElementById("output").style.display = "block";
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      document.getElementById("preview").innerHTML =
        `<div style="color: red;">Error submitting post</div>`;
      document.getElementById("output").style.display = "block";
    }
  });
