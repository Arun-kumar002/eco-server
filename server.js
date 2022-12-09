//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
//!local modules
const { connectDb } = require("./config/db");
const { PORT } = require("./config/index");
const adminRoutes = require("./apis/admin/route");
const userRoutes = require("./apis/user/route");
const notFoundRoutes = require("./routes/notfoundroute");

//!middleware section
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    /* origin & methods*/
  })
);
app.use(morgan("dev"));
//!mount here
app.use("/", userRoutes);
app.use("/auth", adminRoutes);
app.use("/", notFoundRoutes);
//!server section
connectDb()
  .then(() => {
    app.listen(PORT, (_) => {
      console.log(`server is listen port no ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = app;
