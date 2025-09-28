// components/chat/FloatingChat.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FloatingChat.module.css";
import { FiMessageCircle } from "react-icons/fi";

const FloatingChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat"); 
  };

  return (
    <div className={styles.chatButton} onClick={handleClick}>
       <FiMessageCircle size={24} />
    </div>
  );
};

export default FloatingChat;
