import React from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import BlogList from "../components/blog/BlogList";

const Blog = () => {
  return (
    <div>
      <PageHeader title="Blog" />
      <BlogList/>
    </div>
  );
};

export default Blog;
