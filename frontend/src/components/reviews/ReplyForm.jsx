import React, { useState } from "react";
import axios from "axios";

export default function ReplyForm({ reviewId, onReplySent }) {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token"); // tokeni localStorage-dən alır

  const handleReplySubmit = async () => {
    if (!comment.trim()) return; // boş mesaj göndərilməsin

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reviews/${reviewId}/reply`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onReplySent(res.data); // cavab göndərildikdə parent komponentə məlumat verir
      setComment(""); // textarea-nı təmizləyir
    } catch (err) {
      alert("Cavab göndərilə bilmədi.");
    }
  };

  return (
    <div>
      <textarea
        placeholder="Cavabınızı yazın..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleReplySubmit}>Cavabla</button>
    </div>
  );
}
