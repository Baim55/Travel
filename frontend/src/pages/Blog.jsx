import React from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import BlogList from "../components/blog/BlogList";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader title={t("pageHeader.blog.title")} />
      <BlogList/>
    </div>
  );
};

export default Blog;
