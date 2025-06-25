import React from "react";
import Hero from "../components/hero/Hero";
import SearchFilter from "../components/search/SearchFilter";
import WhyUs from "../components/whyUs/WhyUs";
import AllTours from "../components/allTours/AllTours";
import Discount from "../components/discount/Discount";
import Testimonials from "../components/testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero/>
      <SearchFilter/>
      <AllTours/>
      <WhyUs/>
      <Discount/>
      <Testimonials/>
    </div>
  );
};

export default Home;
