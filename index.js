const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const connectDB = require("./config/db");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Book Store API");
});

connectDB();

app.listen(PORT, () => {
  console.log("app is runing on port " + PORT);
});
