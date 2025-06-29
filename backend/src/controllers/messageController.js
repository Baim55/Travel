// // controllers/messageController.js
// import Message from "../models/messageModel.js";

// export const getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
