import ChatMessage from "../models/chatMessage.js";

// /api/chat?userId=USER_ID
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId göndərilməyib" });
    }

    const messages = await ChatMessage.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Mesajlar alınarkən xəta:", err.message);
    res.status(500).json({ message: "Mesajlar alınmadı", error: err.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, senderName, message } = req.body;

    // Validation
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "Bütün sahələr tələb olunur" });
    }

    const newMessage = new ChatMessage({
      senderId,
      receiverId,
      senderName: senderName || "Anonim",
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Mesaj göndərilərkən xəta:", err.message);
    res.status(500).json({ message: "Mesaj göndərilə bilmədi", error: err.message });
  }
};
