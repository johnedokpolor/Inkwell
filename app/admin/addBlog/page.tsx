"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    author: "Admin",
    authorImg:
      "https://res.cloudinary.com/dc8icbbn4/image/upload/v1761781453/blog_pics/jfdxvlhzqr8xofufbwlj.png",
  });

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreview(preview);
    }
  }, [image]);

  // Typewriter effect for generated text
  useEffect(() => {
    if (!generatedText) return;
    let i = 0;
    setData((prev) => ({
      ...prev,
      description: "",
    }));
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        description: prev.description + generatedText.charAt(i),
      }));
      i++;
      if (i >= generatedText.length) {
        clearInterval(interval);
        setAiLoading(false);
      }
    }, 20); // speed (ms per character)
    return () => clearInterval(interval);
  }, [generatedText]);

  const displayImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    if (!data.description) {
      toast.error("Please write a blog post");
      return;
    }
    if (!data.category) {
      toast.error("Please select a category");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Blog was not added. Try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Blog was not added. Try again");
    } finally {
      setLoading(false);
    }
  };

  const generateBlog = async () => {
    if (!data.title) {
      toast.error("Please enter a title");
      return;
    }

    const formData = new FormData();
    formData.append("content", data.title);
    setAiLoading(true);
    try {
      const response = await axios.post("/api/generateBlog", formData);
      console.log(response);

      if (response.data.success) {
        setGeneratedText(response.data.blogContent);
      } else {
        toast.error("Failed to generate blog post. Try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="pt-5 w-full  px-5 sm:pt-12 sm:px-15">
        <p className="text-lg font-medium mb-4">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            width={200}
            height={60}
            src={image ? preview : assets.upload_area}
            alt="upload-area"
            className="cursor-pointer"
          />
          <input
            onChange={displayImage}
            type="file"
            name="image"
            id="image"
            hidden
          />
        </label>
        <p className="font-medium mt-3 text-lg">Blog Title</p>
        <input
          type="text"
          onChange={handleChange}
          className="border px-2 py-2 w-full  outline-0 border-gray-500 mt-4 sm:w-[700px] rounded-md "
          value={data.title}
          placeholder="Type Here"
          name="title"
          required
        />
        <p className="font-medium mt-3 text-lg">Blog Description</p>
        <div className="relative w-full sm:w-[700px]">
          <textarea
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="border px-2 py-2 w-full  outline-0 border-gray-500 mt-4  rounded-md "
            name="description"
            value={data.description}
            placeholder="Write Content Here"
            rows={7}
          />
          <button
            onClick={generateBlog}
            className="py-2 cursor-pointer absolute right-3 bottom-3 px-4 rounded-md bg-black text-white"
          >
            {aiLoading ? "Generating..." : "Generate Blog"}
          </button>
        </div>

        <p className="font-medium mt-3 text-lg">Blog Category</p>

        <select
          name="category"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          value={data.category}
          className="w-60 my-4 rounded-md outline-0 px-4 py-2 border text-gray-500"
        >
          <option value="">Select Category</option>

          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
        </select>
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black cursor-pointer mb-5 w-40 mt-3 rounded-md text-white px-2 py-3"
        >
          {loading ? "ADDING..." : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default Page;
