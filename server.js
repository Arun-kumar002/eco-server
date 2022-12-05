//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
//!local modules
const { connectDb } = require("./config/db");
const { PORT } = require("./config/index");
const adminRoutes = require("./apis/admin/route");
const userRoute = require("./apis/user/route");
const notfound = require("./routes/notfoundroute");

//!middleware section
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
//!mount here
app.use("/", userRoute);
app.use("/auth", adminRoutes);
app.use("/", notfound);

//!server section
connectDb();
app.listen(PORT, (_) => {
  console.log(`server is listen port no ${PORT}`);
});

module.exports = app;
