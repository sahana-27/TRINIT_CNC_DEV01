// require('dotenv').config();
const mongoose = require("mongoose");

const db = "mongodb+srv://nazraf:nandanaisaloser1@cluster0.6uipfrv.mongodb.net/test";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[Info] MongoDB Connected Successfully!");
  } catch (err) {
    console.error(err.message);

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;