const messengerController = require("./controller");
const messengerErrors = require("./errors/messengerErrors");
const tag = "messenger-service";
exports.newConverstion = async (req, res) => {
  try {
    let params = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    };
    const savedConversation = await messengerController.newConverstion(params);
    res
      .status(200)
      .json({ message: "successfull", savedConversation, status: "success" });
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
};

exports.getConverstion = async (req, res) => {
  try {
    let params = {
      userId: req.params.userId,
    };
    const conversation = await messengerController.getConverstion(
      params.userId
    );
    res
      .status(200)
      .json({ message: "successfull", conversation, status: "success" });
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
};

exports.newMessage = async (req, res) => {
  try {
    let params = {
      sender: req.body.sender,
      conversationId: req.body.conversationId,
      messages: req.body.messages,
    };
    const savedMessage = await messengerController.newMessage(params);
    res
      .status(200)
      .json({ message: "successfull", savedMessage, status: "success" });
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
};

exports.getMessages = async (req, res) => {
  try {
    let params = {
      conversationId: req.params.conversationId,
    };
    console.log(params);
    const messages = await messengerController.getMessages(
      params.conversationId
    );
    res
      .status(200)
      .json({ message: "successfull", messages, status: "success" });
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
};
