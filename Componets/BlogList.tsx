import { blog_data } from "@/Assets/assets";
import React from "react";
import BlogItem from "./Blogitem";

const BlogList = () => {
  const categories = [
    // { name: "All" },
    { name: "Technology" },
    { name: "Lifestyle" },
    { name: "Education" },
    { name: "Business" },
    { name: "Politics" },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center my-10">
        <button className="px-4 py-1 text-white bg-black rounded-sm">
          All{" "}
        </button>
        {categories.map((category) => (
          <button className="px-4 py-1 text-black rounded-sm">
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around mb-16 gap-y-10 sm:mx-10 ">
        {blog_data.map((blog) => {
          return (
            <BlogItem
              title={blog.title}
              description={blog.description}
              category={blog.category}
              image={blog.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
