Book Management API
Welcome to the Book Management API! This API allows you to perform CRUD operations on book entries, as well as user authentication.


Setup
1.Clone the repository:
   git clone [url](https://github.com/sachinjat2802/bookstore.git)

2.Install dependencies:
    npm i

3.Start server
    npm run start



Endpoints

Authentication

POST /api/auth/register: Register a new user
POST /api/auth/login: Login with existing user credentials

Books
GET /api/books: Get all books with filters with author and publishing year
POST /api/books: Create a new book
GET /api/books/:id: Get a single book by ID
PUT /api/books/:id: Update a book by ID
DELETE /api/books/:id: Delete a book by ID



