const express = require("express");
const cors = require("cors");
const app = express();
//!local modules
const { connectDb } = require("./config/db");
//!middleware section
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//!server section
connectDb();
app.listen(5000, (_) => {
  console.log("server is listen port no 5000");
});
