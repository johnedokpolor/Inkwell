"use client";
import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./Blogitem";
import { motion } from "motion/react";
import axios from "axios";
const BlogList = () => {
  interface Blog {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    author: string;
    author_img: string;
  }
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const categories = [
    { name: "All" },
    { name: "Technology" },
    { name: "Lifestyle" },
    { name: "Education" },
    { name: "Business" },
    { name: "Startup" },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("Fetching blogs");
      try {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center mt-10">
        {categories.map((category, i) => (
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            onClick={() => setMenu(category.name)}
            className={`px-4 py-1 text-black rounded-sm ${
              menu === category.name && "text-white bg-black"
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
      {blogs && (
        <div className="flex flex-wrap gap-5 mx-5 mb-16 sm:mx-10 mt-10 ">
          {blogs
            .filter((item: Blog) =>
              menu === "All" ? true : item.category === menu
            )
            .map((blog: Blog, i: number) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50, rotate: -10 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    rotate: 0,

                    transition: {
                      duration: 0.5,
                      delay: i * 0.1,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 1,
                    borderRadius: "50%",
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                >
                  <BlogItem
                    id={blog._id}
                    title={blog.title}
                    description={blog.description}
                    category={blog.category}
                    image={blog.image}
                  />
                </motion.div>
              );
            })}
        </div>
      ) 
    }
     {blogs?.length ===0 && (
        <p className="font-medium text-lg text-center my-5"> No Blogs Available</p>
      )}
      {!blogs && (
        <p className="font-medium text-lg text-center my-5">Loading Blogs...</p>
      )}
    </div>
  );
};

export default BlogList;
