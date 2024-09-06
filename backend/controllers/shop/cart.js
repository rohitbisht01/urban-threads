const Cart = require("../../models/cart");
const Product = require("../../models/product");

// add poduct to cart
const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const product = await Product.findById(productId);
    if (!productId) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding product to cart",
    });
  }
};

// get products added to cart
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(req.params);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId not found",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price saleprice",
    });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not found",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      saleprice: item.productId.saleprice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
    });
  }
};

// update cart items
const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not found",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price saleprice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      saleprice: item.productId ? item.productId.saleprice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
    });
  }
};

// delete product from cart
const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price saleprice",
    });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();

    await Cart.populate({
      path: "item.productId",
      select: "image title price saleprice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      saleprice: item.productId ? item.productId.saleprice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting cart items",
    });
  }
};

module.exports = {
  addProductToCart,
  fetchCartItems,
  updateCartItems,
  deleteCartItems,
};
