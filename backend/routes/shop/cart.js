const express = require("express");
const {
  addProductToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
} = require("../../controllers/shop/cart");
const router = express.Router();

router.post("/add", addProductToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);

module.exports = router;
