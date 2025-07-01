import React from "react";
import Hero from "../components/hero/Hero";
import SearchFilter from "../components/search/SearchFilter";
import WhyUs from "../components/whyUs/WhyUs";
import Discount from "../components/discount/Discount";
import Testimonials from "../components/testimonials/Testimonials";
import Destinations from "../components/destinations/Destinations";
import { Helmet } from "react-helmet";
import About from "../components/about/AboutUs";
import FeaturedTours from "../components/featuredTours/FeaturedTours";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Home | NeoTravel</title>
      </Helmet>
      <Hero />
      <SearchFilter />
      <FeaturedTours/>
      <WhyUs />
      <Discount />
      <Testimonials />
      <Destinations />
      <About/>
    </div>
  );
};

export default Home;
