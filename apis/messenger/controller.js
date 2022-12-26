const ConversationModel = require("./models/Conversations");
const MessageModel = require("./models/Messages");
const messengerErrors = require("./errors/messengerErrors");
const UserModel = require("./../user/models/UserModel");
const AdminModel = require("./../admin/models/AdminModel");
exports.newConverstion = async ({ senderId, receiverId }) => {
  let data = await ConversationModel.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (data) {
    return data;
  }

  const newConversation = new ConversationModel({
    members: [senderId, receiverId],
  });

  const savedConversation = await newConversation.save();

  return savedConversation;
};

exports.getConverstion = async (userId) => {
  const conversation = await ConversationModel.find({
    members: { $in: [userId] },
  });

  if (conversation == null) {
    throw new messengerErrors.ConversationNotExistError();
  }

  return conversation;
};

exports.newMessage = async (message) => {
  const newMessage = new MessageModel(message);

  const savedMessage = await newMessage.save();

  return savedMessage;
};

exports.getMessages = async (conversationId) => {
  const messages = await MessageModel.find({
    conversationId: conversationId,
  }).sort({ createdAt: 1 });

  return messages;
};

exports.getNotification = async (userId) => {
  const notify = await AdminModel.findById(userId).select("-password");

  return notify;
};

exports.removeNotification = async (userId) => {
  const notifyAdmin = await AdminModel.findById(userId).updateOne({
    socketId: [],
  });

  if (notifyAdmin.modifiedCount != 1 || notifyAdmin.matchedCount == 0) {

    await UserModel.findById(userId).updateOne({
      socketId: [],
    });
    return;
  }
 
  return;
};
