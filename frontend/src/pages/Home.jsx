import React from "react";
import Hero from "../components/hero/Hero";
import SearchFilter from "../components/search/SearchFilter";
import WhyUs from "../components/whyUs/WhyUs";
import AllTours from "../components/allTours/AllTours";
import Discount from "../components/discount/Discount";
import Testimonials from "../components/testimonials/Testimonials";
import Destinations from "../components/destinations/Destinations";
import { Helmet } from "react-helmet";
import About from "../components/about/AboutUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Home | NeoTravel</title>
      </Helmet>
      <Hero />
      <SearchFilter />
      <AllTours />
      <WhyUs />
      <Discount />
      <Testimonials />
      <Destinations />
      <About/>
    </div>
  );
};

export default Home;
