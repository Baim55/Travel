import React from "react";
import AllTours from "../components/allTours/AllTours";
import PageHeader from "../components/pageHeader/PageHeader";
import { useTranslation } from "react-i18next";

const Destination = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t("pageHeader.destinations.title")} />
      <AllTours />
    </div>
  );
};

export default Destination;
