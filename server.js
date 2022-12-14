//!third party modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const Keycloak = require("keycloak-connect");
const session = require("express-session");

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const app = express();

const http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
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
const MessageModel = require("./apis/messenger/models/Messages");
const UserModel = require("./apis/user/models/UserModel");
const AdminModel = require("./apis/admin/models/AdminModel");

//!middleware section
//?session
app.use(
  session({
    secret: "ecobillz",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.set( 'trust proxy', true );
app.use( keycloak.middleware() );
//?logger
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
app.use("/api/v1",keycloak.protect(), userRoutes);
app.use("/api/v1",keycloak.protect(), adminRoutes);
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
      async ({
        senderId,
        receiverId,
        messages,
        conversationId,
        senderName,
      }) => {
        const newMessage = new MessageModel({
          conversationId: conversationId,
          sender: senderId,
          messages: messages,
        });
        await newMessage.save();
        let userNotify = await UserModel.updateOne(
          { _id: receiverId },
          { $push: { socketId: senderName } }
        );
        if (userNotify.matchedCount == 0) {
          await AdminModel.updateOne(
            { _id: receiverId },
            { $push: { socketId: senderName } }
          );
        }
        const user = getUser(receiverId);
        const toid = user.socketId;
        let data = {
          senderId,
          messages,
          receiverId,
          senderName,
        };
        io.emit("getMessage", data);
      }
    );
    //!web
    socket.on("addCall", ({ receiverId, senderId, offer }) => {
      let datas = {
        receiverId,
        senderId,
        offer: offer,
      };

      io.emit("getCall", datas);
    });

    socket.on("callAccepted", ({ receiverId, senderId, answer }) => {
      let getdatas = { receiverId, senderId, answer };
      io.emit("getAccepted", getdatas);
    });

    socket.on("disconnected", () => {
      console.log("a user is disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
// module.exports = app;
