# Blog Application

A simple full-stack blog application built with HTML, CSS, JavaScript, and Express.js. Features a web form for creating blog posts and displays existing posts stored in a JSON file.

## Features

- Create new blog posts with title, content, author, and timestamp
- View all existing blog posts in a clean, responsive interface
- RESTful API for CRUD operations
- File-based data storage using JSON
- Automatic form validation
- Real-time updates after post creation

## Project Structure

```
blog-app/
├── data.json              # Blog posts data storage
├── index.js              # Express.js API server
├── package.json           # Project dependencies
└── public/
    └── index.html         # Frontend blog form and display
└── SOLUTION/
    └── index.js           # SOLVED - Express.js API server
```

## Installation

1. **Clone or download the project files**

2. **Install dependencies**

   ```bash
   npm init -y
   npm install express cors
   ```

3. **Create the data.json file** (if not already present)

   ```json
   {
     "blogPosts": [
       {
         "blogTitle": "Getting Started with Web Development",
         "blogContent": "Web development is an exciting field that combines creativity with technical skills. Whether you're building your first website or diving into advanced frameworks, the journey is rewarding. Start with HTML, CSS, and JavaScript fundamentals before exploring modern tools and libraries.",
         "blogAuthor": "Sarah Johnson",
         "createdAt": "2025-06-20T10:30:00"
       }
     ]
   }
   ```

4. **Create the public directory and add index.html**
   ```bash
   mkdir public
   # Add the index.html file to the public directory
   ```

## Running the Application

1. **Start the server**

   ```bash
   node server.js
   ```

2. **Open your browser**
   Navigate to `http://localhost:8080`

3. **Use the application**
   - Fill out the form to create new blog posts
   - View existing posts below the form
   - Posts are automatically saved to `data.json`

## API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/posts`     | Get all blog posts           |
| GET    | `/api/posts/:id` | Get a specific post by index |
| POST   | `/api/posts`     | Create a new blog post       |
| PUT    | `/api/posts/:id` | Update an existing post      |
| DELETE | `/api/posts/:id` | Delete a post                |
| GET    | `/api/health`    | Health check endpoint        |

## API Usage Examples

### Create a new blog post

```bash
curl -X POST http://localhost:8080/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "blogTitle": "My New Post",
    "blogContent": "This is the content of my blog post.",
    "blogAuthor": "John Doe",
    "createdAt": "2025-06-26T12:00:00"
  }'
```

### Get all posts

```bash
curl http://localhost:8080/api/posts
```

### Get a specific post

```bash
curl http://localhost:8080/api/posts/0
```

### Update a post

```bash
curl -X PUT http://localhost:8080/api/posts/0 \
  -H "Content-Type: application/json" \
  -d '{
    "blogTitle": "Updated Title",
    "blogContent": "Updated content.",
    "blogAuthor": "John Doe",
    "createdAt": "2025-06-26T12:00:00"
  }'
```

### Delete a post

```bash
curl -X DELETE http://localhost:8080/api/posts/0
```

## Data Structure

Each blog post contains the following fields:

- `blogTitle` (string, required): The title of the blog post
- `blogContent` (string, required): The main content/body of the post
- `blogAuthor` (string, required): The author's name
- `createdAt` (string, required): ISO datetime string when the post was created

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON file
- **HTTP Client**: Fetch API

## Development

### File Operations

The application uses Node.js `fs.promises` for asynchronous file operations:

- `readFile()` to load blog posts from `data.json`
- `writeFile()` to save new or updated posts

### Error Handling

- Missing file handling (creates empty structure if `data.json` doesn't exist)
- Form validation on both client and server side
- HTTP error responses with descriptive messages
- Frontend error display for failed API calls

### CORS Support

The server includes CORS middleware to allow cross-origin requests during development.

## Customization

### Styling

Modify the CSS in `public/index.html` to change the appearance:

- Form styling in the `<style>` section
- Post display formatting
- Responsive design adjustments

### API Extensions

Add new endpoints in `server.js`:

- Search functionality
- Post categories/tags
- User authentication
- File upload support

### Frontend Features

Enhance `public/index.html` with:

- Edit/delete buttons for existing posts
- Search and filter functionality
- Pagination for large numbers of posts
- Rich text editor for post content

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```
   Error: listen EADDRINUSE :::8080
   ```

   Solution: Change the PORT variable in `server.js` or kill the process using port 8080

2. **Cannot read data.json**
   Solution: Ensure `data.json` exists in the project root directory

3. **Posts not displaying**
   Solution: Check that the server is running and accessible at `http://localhost:8080`

4. **CORS errors**
   Solution: Ensure the `cors` package is installed and the middleware is properly configured

## License

This project is open source and available under the MIT License.
