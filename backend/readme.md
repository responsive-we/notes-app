
🧠 Smart Notes App - Backend
===========================

This is the backend server for the **Notes App**, a full-stack note-taking application built using the MERN (MongoDB, Express, React, Node.js) stack.

The backend provides RESTful APIs for user authentication and note management including optional features like pinning, archiving, soft delete (trash), and markdown support.

------------------------------------------------------------

🚀 Features
-----------
- 🔐 User Registration & Login (with JWT)
- ✏️ Create, Update, Delete Notes
- 📁 Support for Archived and Trashed Notes (Soft Delete)
- 📌 Pin/Unpin Notes
- 🔍 Search and Filter Notes
- 🧠 Markdown Syntax Support (Frontend)
- 🔒 Secure with JWT, bcrypt, Helmet, and CORS
- 🧪 Input validation & error handling middleware

🛠️ Tech Stack
-------------
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JWT, bcrypt
- Security: Helmet, CORS
- Validation: express-validator
- Hosting: Render


📦 Installation
---------------
1. Clone the repository
```
$ git clone https://github.com/responsive-we/notes-app`

$ cd notes-app
```

2. Install dependencies
`$ npm install`

3. Create `.env` file
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

4. Run the server
`$ npm run start`

Server will be running at: http://localhost:5000

🌐 API Endpoints
-----------------
🔑 Auth Routes (/api/auth)
- POST /register – Register new user
- POST /login – Login and get JWT token

📝 Note Routes (/api/notes)
- GET / – Get all notes
- POST /create – Create a new note
- PUT /update/:id – Update a note
- DELETE /delete/:id – Permanently delete a note
- PUT /trash/:id – Move note to trash
- PUT /restore/:id – Restore note from trash
- PUT /archive/:id – Archive/unarchive a note
- PUT /pin/:id – Pin/unpin a note

(All note routes require an Authorization header with a valid JWT)

🧪 Sample API Usage (Postman)
------------------------------
Include in headers:

```
Authorization: Bearer <your_token>
```

Body (JSON):
```
{
  "title": "Meeting Notes",
  "content": "Discuss project architecture."
}
```
🛡️ Security
------------
- Passwords hashed using bcrypt
- JWT stored on client and sent via Authorization header
- Input validation and error handling middleware
- Helmet for setting secure headers
- CORS enabled for frontend communication

🚀 Deployment (Render)
-----------------------
1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repo
4. Add environment variables (MONGO_URI, JWT_SECRET)
5. Set Build Command: npm install
6. Set Start Command: npm start


✍️ Author
----------
Mohammad Ayan

Made with ❤️ using MERN stack