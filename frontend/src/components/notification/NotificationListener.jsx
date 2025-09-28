import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

const NotificationListener = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user || !user._id) return;

    const handleMessage = (data) => {
      const isOwnMessage = String(data?.senderId) === String(user._id);
      const isToMe = String(data?.receiverId) === String(user._id);

      if (!isOwnMessage && isToMe) {
        toast.info(`Yeni mesaj: ${data.message}`, {
          position: "bottom-right",
          autoClose: 4000,
        });

        const audio = new Audio("/notification.mp3");
        audio.play().catch(() => {});
      }
    };

    socket.on("chat_message", handleMessage);

    return () => {
      socket.off("chat_message", handleMessage);
    };
  }, [user]);

  return null;
};

export default NotificationListener;
