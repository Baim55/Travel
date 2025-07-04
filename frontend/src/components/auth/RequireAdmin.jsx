import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = useSelector((state) => state.user.user); 
  const location = useLocation(); 

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#900" }}>
        Access Denied
      </div>
    );
  }

  return children;
}
