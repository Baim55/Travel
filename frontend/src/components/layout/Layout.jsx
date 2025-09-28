import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ScrollToTop from "../scroll/ScrollToTop";
import BackToTopButton from "../scroll/BackToTopButton";
import FloatingChat from "../chat/FloatingChat";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
      <BackToTopButton />
      <FloatingChat/>
    </div>
  );
};

export default Layout;
