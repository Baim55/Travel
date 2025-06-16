import React from "react";
import Hero from "../components/hero/Hero";
import SearchFilter from "../components/search/SearchFilter";
import WhyUs from "../components/whyUs/WhyUs";
const Home = () => {
  return (
    <div>
      <Hero/>
      <SearchFilter/>
      <WhyUs/>
    </div>
  );
};

export default Home;
