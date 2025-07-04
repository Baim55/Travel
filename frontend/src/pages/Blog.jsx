import React from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import BlogList from "../components/blog/BlogList";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Blog = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title> Blog | NeoTravel</title>
      </Helmet>
      <PageHeader title={t("pageHeader.blog.title")} />
      <BlogList />
    </div>
  );
};

export default Blog;
