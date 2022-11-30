//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
//!local modules
const { connectDb } = require("./config/db");
const { PORT, HOST } = require("./config/index");
const authRoutes=require('./routes/authroutes')
//!middleware section
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
//!mount here
app.use('/auth',authRoutes)
//!server section
connectDb();
app.listen(PORT, HOST, (_) => {
  console.log(`server is listen port no ${PORT}`);
});
