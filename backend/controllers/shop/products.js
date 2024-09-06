const Product = require("../../models/product");

// get all products for user
const getAllProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.price = 1;
        break;
      case "title-ztoa":
        sort.price = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

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

// get a single product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }

    const product = await Product.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully reterived product",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error getting product",
    });
  }
};

module.exports = { getAllProducts, getProductDetails };
