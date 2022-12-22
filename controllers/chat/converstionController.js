// const Conversation = require("../../apis/messenger/Models/Conversations");

// //new conv

// const newConverstion = async (req, res) => {
//   try {
//     if (
//       (req.body.senderId == "" || undefined) &&
//       (req.body.receiverId == "" || undefined)
//     ) {
//       res.status(403).json({ message: "fields cant be empty" });
//     } else {
     
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // newBroadcastChat
// const newbroadcastConverstion = async (req, res) => {
//   try {
//     // console.log([req.body.senderId, req.body.receiversId]);
//     if (
//       (req.body.senderId == "" || undefined) &&
//       (req.body.receiversId == "" || undefined)
//     ) {
//       res.status(403).json({ message: "fields cant be empty" });
//     } else {
//       let data = await Conversation.findOne({
//         members: { $all: [req.body.senderId, req.body.receiversId] },
//       });
//       console.log(data);
//       if (!data) {
//         const newConversation = new Conversation({
//           members: [req.body.senderId, req.body.receiversId],
//         });
//         const savedConversation = await newConversation.save();
//         res
//           .status(200)
//           .json({ message: "newConversation Id", result: savedConversation });
//       } else {
//         res.status(200).json({ message: "Conversation Id", result: data });
//       }
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // conversations ids



// //get conv of a user

// const getConverstion = async (req, res) => {
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: [req.params.userId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // get conv includes two userId

// const getConverstionboth = async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     if (conversation) {
//       res.status(201).json({ conversation: conversation._id });
//     } else {
//       res.status(403).json({ result: "nooo---conversation ID" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports = {
//   newConverstion,
//   newbroadcastConverstion,
//   getConverstion,
//   getConverstionboth,
// };
