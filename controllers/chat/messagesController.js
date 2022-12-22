// const Message = require("../../apis/messenger/Models/Messages");

// //add

// const newAddMssages = async (req, res) => {
//   if (req.body.brodcastchat == "") {
//     if (
//       req.body.sender == "" ||
//       req.body.conversationId == "" ||
//       undefined ||
//       req.body.text == "" ||
//       undefined ||
//       req.body.brodcastchat == "" ||
//       undefined
//     ) {
//       res.status(403).json({ message: "fields cant be empty" });
//     } else {
//       const newMessage = new Message(req.body);
      
//       try {
//         const savedMessage = await newMessage.save();
//         res.status(200).json(savedMessage);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     }
//   } else {
//     if (
//       req.body.sender == "" ||
//       undefined ||
//       req.body.conversationId == "" ||
//       undefined ||
//       req.body.text == "" ||
//       undefined
//     ) {
//       res.status(403).json({ message: "fields cant be empty" });
//     } else {
//       const newMessage = new Message(req.body);
//       try {
//         const savedMessage = await newMessage.save();
//         res.status(200).json(savedMessage);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     }
//   }
// };
// // fiels sending
// const newAddFiles = async (req, res) => {
//   console.log(req.files);
//   try {
//     res.status(200).json({ files: req.files });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // broadcast chat sending
// const newbroadcastchatAddMssages = async (req, res) => {
//   const newMessage = new Message(req.body);

//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// //get

// const getMessages = async (req, res) => {
//   let skipstart = parseInt(req.query.scroll) || 0;
//   let limit = 250;
//   // let startIndex = page > 0 ? (page - 1) * limit : 0;
//   try {
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     })
//       .sort({ createdAt: 1 })
//       .limit(limit)
//       .skip(skipstart);
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // new get msg

// const allMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({
//       $or: [
//         {
//           $and: [
//             { sender: req.body.senderId },
//             { receiver: req.body.receiverId },
//           ],
//         },
//         {
//           $and: [
//             { receiver: req.body.senderId },
//             { sender: req.body.receiverId },
//           ],
//         },
//       ],
//     });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const allBroadcastMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({
//       $and: [
//         {
//           sender: req.body.senderId,
//           receiver: { $all: req.body.receiversId },
//         },
//       ],
//     });
//     console.log(messages);
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports = {
//   newAddMssages,
//   getMessages,
//   newAddFiles,
//   allMessages,
//   allBroadcastMessages,
// };
