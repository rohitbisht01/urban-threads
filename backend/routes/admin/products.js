const express = require("express");
const router = express.Router();
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/products");
const { upload } = require("../../helpers/cloudinary");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.post("/add", addProduct);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
