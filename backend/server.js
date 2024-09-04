const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDb = require("./helpers/database");

const authRoute = require("./routes/auth");
const adminProductRoute = require("./routes/admin/products");

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

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
