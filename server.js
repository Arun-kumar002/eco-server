//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
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
app.use(helmet());

//!mount here
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/", notFoundRoutes);

//!server section
connectDb();

app.listen(PORT, (_) => {
  console.log(`server is listen port no ${PORT}`);
});

module.exports = app;
