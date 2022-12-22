const ConversationModel = require("./Models/Conversations");
const MessageModel = require("./Models/Messages");

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
  return conversation;
};

exports.newMessage = async (message) => {
  const newMessage = new MessageModel(message);
  const savedMessage = await newMessage.save();
  return savedMessage;
};

exports.getMessages=async(conversationId)=>{
    const messages = await MessageModel.find({
        conversationId:conversationId,
      }).sort({ createdAt: 1 })
    return messages
}