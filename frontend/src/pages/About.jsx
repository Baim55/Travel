import React from "react";
import AboutUs from "../components/about/AboutUs";
import WhyUs from "../components/whyUs/WhyUs";
import AboutStats from "../components/aboutStats/AboutStats";
import Team from "../components/team/Team";
import PageHeader from "../components/pageHeader/PageHeader";
import Testimonials from "../components/testimonials/Testimonials";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title> About | NeoTravel</title>
      </Helmet>
      <PageHeader title={t("pageHeader.about.title")} />
      <AboutUs />
      <WhyUs />
      <AboutStats />
      <Team />
      <Testimonials />
    </div>
  );
};

export default About;
