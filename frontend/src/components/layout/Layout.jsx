import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import ScrollToTop from "../scroll/ScrollToTop";
import BackToTopButton from "../scroll/BackToTopButton";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
