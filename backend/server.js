const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDb = require("./helpers/database");

const authRoute = require("./routes/auth");
const adminProductRoute = require("./routes/admin/products");
const shopProductRoute = require("./routes/shop/products");
const cartRoute = require("./routes/shop/cart");
const addressRoute = require("./routes/shop/address");
const shopOrderRoute = require("./routes/shop/shop-order");

const PORT = process.env.PORT || 4000;

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductRoute);

app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", cartRoute);
app.use("/api/shop/address", addressRoute);
app.use("/api/shop/order", shopOrderRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
