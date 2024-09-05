const express = require("express");
const { getAllProducts } = require("../../controllers/shop/products");

const router = express.Router();

router.get("/get", getAllProducts);

module.exports = router;
