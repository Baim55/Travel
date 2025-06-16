import React from "react";
import Logo from "../logo/Logo";
import Navlist from "../navlist/Navlist";
import Wrapper from "../wrapper/Wrapper";

const Navbar = () => {
  return (
    <div className="navbar container">
      <Logo />
      <Navlist />
      <Wrapper />
    </div>
  );
};

export default Navbar;
