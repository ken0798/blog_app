const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log(`Mongo connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

module.exports = connectDB;
