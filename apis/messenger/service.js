const messengerController = require("./controller");
const messengerErrors = require("./errors/messengerErrors");
const ValidationSchema = require("../../helpers/validators/validationHelper");
const tag = "messenger-service";
exports.newConverstion = async (req, res) => {

  try {

    let params = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    };

    await ValidationSchema.newConversation.validateAsync(params);

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

    await ValidationSchema.getConversation.validateAsync(params);

    const conversation = await messengerController.getConverstion(params.userId);

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

    await ValidationSchema.newMessage.validateAsync(params);

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

    await ValidationSchema.getMessages.validateAsync(params);

    const messages = await messengerController.getMessages(params.conversationId);

    res
      .status(200)
      .json({ message: "successfull", messages, status: "success" });
      
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
};

exports.getNotifications=async(req,res)=>{
  try {
    let params={
      userId:req.query.userId
    }

    const notification = await messengerController.getNotification(params.userId);

    res
      .status(200)
      .json({ message: "successfull", notification, status: "success" });
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
}

exports.removeNotification=async(req,res)=>{
  try {
    let params={
      userId:req.query.userId
    }
     await messengerController.removeNotification(params.userId);
  
    res
        .status(200)
        .json({ message: "successfull", status: "success" });
        
  } catch (error) {
    messengerErrors.handleError(error, tag, req, res);
  }
}