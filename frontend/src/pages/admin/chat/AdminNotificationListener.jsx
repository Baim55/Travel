import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../../../socket";

const AdminNotificationListener = ({ selectedUserId }) => {
  useEffect(() => {
    const handleMessage = (data) => {
      const isFromUser = data.senderId !== "admin-id";
      const isNotSelected = data.senderId !== selectedUserId;

      if (isFromUser && isNotSelected) {
        toast.info(`${data.senderName}: ${data.message}`, {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    };

    socket.on("chat_message", handleMessage);
    return () => socket.off("chat_message", handleMessage);
  }, [selectedUserId]);

  return null;
};

export default AdminNotificationListener;
