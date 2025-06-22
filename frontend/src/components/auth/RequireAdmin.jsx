import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = useSelector((state) => state.user.user); // Redux-dan istifadəçi məlumatını al
  const location = useLocation(); // Hazırkı ünvan

  // Əgər login olunmayıbsa, login səhifəsinə yönləndir
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Əgər admin deyilsə, giriş qadağandır
  if (!user.isAdmin) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#900" }}>
        Access Denied
      </div>
    );
  }

  // Əgər hər şey qaydasındadırsa, admin childrenləri göstər
  return children;
}
