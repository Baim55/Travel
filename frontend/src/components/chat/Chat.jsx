import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../../socket";
import styles from "./Chat.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const receiverId = "admin-id";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (!userId) {
      toast.error("Xəta: userId tapılmadı. Lütfən login olun.");
      navigate("/login");
      return;
    }

    setCurrentUserId(userId);
    setCurrentUserName(username || "İstifadəçi");
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    axios
      .get(`http://localhost:5000/api/chat?userId=${currentUserId}`)
      .then((res) => setChat(res.data))
      .catch((err) => console.error("Mesajlar yüklənmədi", err));

    const handleIncoming = (data) => {
      if (
        (data.senderId === currentUserId && data.receiverId === receiverId) ||
        (data.senderId === receiverId && data.receiverId === currentUserId)
      ) {
        setChat((prev) => [...prev, data]);
      }
    };

    socket.on("chat_message", handleIncoming);
    return () => socket.off("chat_message", handleIncoming);
  }, [currentUserId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      senderId: currentUserId,
      receiverId,
      senderName: currentUserName,
      message,
    };

    try {
      await axios.post("http://localhost:5000/api/chat", newMsg);
      socket.emit("chat_message", newMsg);
      setChat((prev) => [...prev, newMsg]);
      setMessage("");
    } catch (err) {
      console.error("Mesaj göndərilə bilmədi:", err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chat}>Live Chat</h2>
      <Helmet>
        <title> Live Chat | NeoTravel</title>
      </Helmet>
      <div className={styles.messages}>
        {chat.map((m, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              m.senderId === currentUserId ? styles.self : styles.other
            }`}
          >
            {m.message}
          </div>
        ))}
      </div>

      <div className={styles.inputBox}>
        <input
          type="text"
          value={message}
          placeholder="Write a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
