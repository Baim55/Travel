import React from "react";
import Hero from "../components/hero/Hero";
import SearchFilter from "../components/search/SearchFilter";
import WhyUs from "../components/whyUs/WhyUs";
import AllTours from "../components/allTours/AllTours";

const Home = () => {
  return (
    <div>
      <Hero/>
      <SearchFilter/>
      <AllTours/>
      <WhyUs/>
    </div>
  );
};

export default Home;
