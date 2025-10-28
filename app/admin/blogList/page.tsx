"use client";
import BlogListItem from "@/Componets/AdminComponents/BlogListItem";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  interface Blog {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    author: string;
    authorImg: string;
    createdAt: string;
  }
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
  useEffect(() => {
    fetchBlogs();
  }, []);

  async function deleteBlog(id: string) {
    try {
      const response = await axios.delete("/api/blog?id=" + id);
      if (response.data.success) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error("Blog Deletion Failed, Try again");
      console.log(error);
    } finally {
      fetchBlogs();
    }
  }
  return (
    <div className="sm:px-15 w-full px-5 pt-7">
      <h1 className="font-medium text-lg mb-7">All Blogs</h1>
      <div className="w-full h-[80vh] border-1 pb-5  overflow-auto">
        {blogs?.length !== 0 ? (
          <table className="w-3xl sm:w-full   ">
            <thead>
              <tr className="text-left uppercase text-gray-700">
                <th className="font-medium text-base  py-3 px-5 ">
                  Author Name
                </th>
                <th className="font-medium text-base py-3  px-5 ">
                  Blog Title
                </th>
                <th className="font-medium text-base py-3  px-5">Date</th>
                <th className="font-medium text-base py-3  px-5">Action</th>
              </tr>
            </thead>
            <tbody className="pb-5">
              {blogs?.map((blog: Blog, i) => {
                return (
                  <BlogListItem
                    id={blog._id}
                    title={blog.title}
                    author={blog.author}
                    authorImg={blog.authorImg}
                    deleteBlog={deleteBlog}
                    key={i}
                    createdAt={blog.createdAt}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center my-10 gap-3 flex-col">
            <p className="text-lg ">No Blogs Available</p>
            <Link
              href="/admin/addBlog"
              className="bg-black rounded-md text-white py-2 px-3 w-auto"
            >
              {" "}
              Add blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
