const express = require("express");
const {
  getAddress,
  updateAddress,
  deleteAddress,
  addAddress,
} = require("../../controllers/shop/address");
const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", getAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", updateAddress);

module.exports = router;
