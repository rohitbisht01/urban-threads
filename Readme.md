# Urban Thread - Clothing E-commerce Application

Urban Thread is a modern e-commerce platform built to provide seamless shopping experiences for clothing enthusiasts. It features both user and admin views, secure authentication, and an integrated payment gateway for hassle-free transactions.

## Features

### User Features:

- **User Authentication**: Secure login and logout using JWT.
- **Product Browsing**: View all products listed by the admin.
- **Cart Management**: Add products to the cart, view, and manage cart items.
- **Checkout and Payment**: Complete the purchase using PayPal, with seamless integration via webhook.

### Admin Features:

- **Product Management**: Add new products, edit, and manage existing product details.
- **Order Processing**: Track product order status from "Pending" to "In-Transit" to "Delivered".
- **Admin Dashboard**: Oversee the entire product listing and order fulfillment process.

### Payment Integration:

- **PayPal Integration**: Secure payment processing using PayPal gateway.
- **PayPal Webhook**: Real-time order confirmation with webhook for seamless transactions.

## Tech Stack

### Frontend:

- **React**: For building the dynamic user interface.
- **Tailwind CSS**: For modern and responsive styling.
- **Redux Toolkit**: For state management and handling global store.

### Backend:

- **Node.js & Express**: For server-side logic and API endpoints.
- **MongoDB**: As the NoSQL database to store user data, products, and orders.
- **JWT**: For secure user authentication.
- **Cloudinary**: For managing and storing product images.

### Payment Gateway:

- **PayPal Integration**: For secure and easy checkout process.

## Installation and Setup

1. **Clone the repository**:
   ```
   git clone git@github.com:rohitbisht01/urban-threads.git
   cd urban-thread
   ```
2. **Install Dependencies**:

   ```
   # For backend
   cd backend
   npm install

   # For frontend
   cd frontend
   npm install
   ```

3. **Environment Variables**: Create a .env file in the backend and add the necessary configuration:

   ```
   PORT=
   MONGODB_URL=

   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   JWT_SECRET=
   JWT_EXPIRES_IN=
   ```

4. **Run the application (both frontend and backend):**
   ```
   npm run dev
   ```
