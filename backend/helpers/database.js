const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error connecting with mongodb", error);
  }
};

module.exports = connectDb;
