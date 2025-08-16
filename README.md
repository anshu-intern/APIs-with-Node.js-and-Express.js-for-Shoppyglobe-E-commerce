# APIs-with-Node.js-and-Express.js-for-Shoppyglobe-E-commerce

This backend API is built to serve the ShoppyGlobe e-commerce platform. It provides RESTful endpoints for managing products, user authentication, and shopping cart operations. The API uses Node.js, Express, MongoDB, and JWT for secure user authentication.

**Technologies Used:**
@Node.js
@Express.js
@MongoDB & Mongoose
@JSON Web Tokens (JWT)
@nodemon
@ThunderClient

**Setup & Installation**
1. Clone the repository:
    git clone https://github.com/anshu-intern/APIs-with-Node.js-and-Express.js-for-Shoppyglobe-E-commerce.git
    cd NodeJS
   
2. Install dependencies:
    npm install
   
3. Start the server:
    npm start
    The API will be running at http://localhost:3000/
   ***NOTE: MongoDB database and related dependencies needs to be configured on the system to access database and run the server fully.***

**API Endpoints**
1. Products
    GET /api/products
      Fetch all products.
    GET /api/products/:id
      Fetch a single product by ID.
2. Cart (Protected Routes)
    POST /api/cart
      Add product to cart.
    PUT /api/cart/:id
      Update product quantity in cart.
    DELETE /api/cart/:id
      Remove product from cart.
3. Authentication
    POST /api/user/register
      Register a new user.
    POST /api/user/login
      Login user and receive JWT token.
