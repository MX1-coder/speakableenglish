require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", () => console.log("Mongoose connected to DB"));
db.on("disconnected", () => console.log("Mongoose disconnected from DB"));
db.on("reconnected", () => console.log("Mongoose reconnected to DB"));

module.exports = db;
