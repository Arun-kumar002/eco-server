const router = require("express").Router();
const messengerServices= require("./service");



//@access public --method-GET
//url=http://localhost:5000/api/v1/:userID
router.get("/:userId", messengerServices.getConverstion);
//@access private --method-GET
//url=http://localhost:5000/api/v1/:userID
router.get("/msg/:conversationId?",messengerServices.getMessages);
//@access public --method-GET
//url=http://localhost:5000/api/v1/notifications?userId=''
router.get("/notifications/:userId", messengerServices.getNotifications);

//@access private --method-GET
//url=http://localhost:5000/api/v1/:userID
router.post("/newmsg", messengerServices.newMessage);
//@access private --method-POST
//url=http://localhost:5000/api/v1/newConversation
router.post("/newConversation", messengerServices.newConverstion);

//@access public --method-PUT
//url=http://localhost:5000/api/v1/removenotifications?userId=''
router.put("/removenotifications", messengerServices.removeNotification);


module.exports = router;
