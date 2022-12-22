//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
  },
});
//!local modules
const { connectDb } = require("./config/db");
const { PORT } = require("./config/index");
const adminRoutes = require("./apis/admin/route");
const userRoutes = require("./apis/user/route");
const notFoundRoutes = require("./routes/notfoundroute");
const MessengerRoute = require("./apis/messenger/route");
const logger = require("./config/logger");
const MessageModel = require("./apis/messenger/Models/Messages");

//!middleware section

app.use((req, res, next) => {
  logger.info(`path-${req.path}, method:${req.method}`);
  let oldsend = res.send;
  res.send = function (data) {
    oldsend.apply(res, arguments);
    logger.info(
      `Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(
        req.body
      )}, Host: ${req.headers.host}, Route: ${req.originalUrl}, IP: ${
        req.ip
      }, Method: ${req.method} Query:${JSON.stringify(req.query)}`,
      { ...req.body, status: res.statusCode, data: data }
    );
  };
  next();
});

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
app.use("/api/v1", MessengerRoute);
app.use("/", notFoundRoutes);

//!server section
connectDb();
http.listen(PORT, async (_) => {
  try {
    console.log("server is listen port no 5000");
    connectSocket();
  } catch (error) {
    logger.error("server-error", error);
  }
});

const connectSocket = () => {
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId != socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId == userId);
  };

  io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("addUser", (user) => {
      console.log("users********", user);
      addUser(user, socket.id);
      io.emit("getUsers", users);
    });

    socket.on(
      "sendMessage",
      async ({ senderId, receiverId, messages, conversationId }) => {
        console.log(
          "sendMessage",
          senderId,
          receiverId,
          messages,
          conversationId
        );
        const newMessage = new MessageModel({
          conversationId: conversationId,
          sender: senderId,
          messages: messages,
        });
        await newMessage.save();

        const user =  getUser(receiverId);
        const toid= user.socketId
        let data = {
          senderId,
          messages,
          receiverId
      }
        io.emit("getMessage", data);
      }
    );

    socket.on("disconnected", () => {
      console.log("a user is disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
// module.exports = app;
