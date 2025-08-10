"use client";
import { blog_data } from "@/Assets/assets";
import React, { useState } from "react";
import BlogItem from "./Blogitem";
import { motion } from "motion/react";
import { div } from "motion/react-client";
const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const categories = [
    { name: "All" },
    { name: "Technology" },
    { name: "Lifestyle" },
    { name: "Education" },
    { name: "Business" },
    { name: "Politics" },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center my-10">
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

      <div className="flex flex-wrap justify-around mb-16 gap-y-10 sm:mx-10 ">
        {blog_data.map((blog, i) => {
          return (
            <motion.div
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
                key={i}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                image={blog.image}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
