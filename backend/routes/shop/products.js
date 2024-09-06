const express = require("express");
const {
  getAllProducts,
  getProductDetails,
} = require("../../controllers/shop/products");

const router = express.Router();

router.get("/get", getAllProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;
