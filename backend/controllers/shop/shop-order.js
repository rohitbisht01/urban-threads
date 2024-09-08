const Order = require("../../models/order");
const paypal = require("../../helpers/paypal");
const Cart = require("../../models/cart");
const Product = require("../../models/product");

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "id is missing",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      status: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "error getting order details",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "userId is missing",
      });
    }

    const orders = await Order.find({ userId });

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      status: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "error getting all order details by user",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price?.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount?.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "error creating order",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Out of stock ${product.title}`,
        });
      }

      product.totalstock -= item.quantity;
      await product.save();
    }

    const cartId = order.cartId;
    await Cart.findByIdAndDelete(cartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "deleted cart items and order confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "error capturing payment",
    });
  }
};

module.exports = {
  getOrderDetails,
  getAllOrdersByUser,
  capturePayment,
  createOrder,
};
