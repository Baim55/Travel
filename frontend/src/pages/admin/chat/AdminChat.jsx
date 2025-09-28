import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminChat.module.css";
import AdminNotificationListener from "./AdminNotificationListener";
import { socket } from "../../../socket";

const AdminChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("İstifadəçilər yüklənmədi", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    axios
      .get(`http://localhost:5000/api/chat?userId=${selectedUserId}`)
      .then((res) => setChat(res.data))
      .catch((err) => console.error("Mesajlar yüklənmədi", err));

    const handleIncoming = (data) => {
      if (
        (data.senderId === "admin-id" && data.receiverId === selectedUserId) ||
        (data.senderId === selectedUserId && data.receiverId === "admin-id")
      ) {
        setChat((prev) => [...prev, data]);
      }
    };

    socket.on("chat_message", handleIncoming);
    return () => socket.off("chat_message", handleIncoming);
  }, [selectedUserId]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedUserId) return;

    const newMsg = {
      senderId: "admin-id",
      receiverId: selectedUserId,
      senderName: "Admin",
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
      <AdminNotificationListener selectedUserId={selectedUserId} />

      <h3>Live Chat – Admin</h3>

      <select
        className={styles.userSelect}
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="" disabled>Select user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      <div className={styles.messages}>
        {chat.map((m, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              m.senderId === "admin-id" ? styles.self : styles.other
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

export default AdminChat;
