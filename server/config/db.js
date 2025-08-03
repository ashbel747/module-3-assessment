const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://ashbel:1238@cluster0.yosfxah.mongodb.net/contacts-api?retryWrites=true&w=majority");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
