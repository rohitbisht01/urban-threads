const Product = require("../../models/product");

// get all products for user
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      message: "Fetched all products",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching all products",
    });
  }
};

module.exports = { getAllProducts };
