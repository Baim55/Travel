import React from "react";
import AllTours from "../components/allTours/AllTours";
import PageHeader from "../components/pageHeader/PageHeader";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Destination = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title> Destinations | NeoTravel</title>
      </Helmet>
      <PageHeader title={t("pageHeader.destinations.title")} />
      <AllTours />
    </div>
  );
};

export default Destination;
