"use client";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { assets } from "@/Assets/assets";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/subscriber", formData);
    console.log(response.data);
    if (response.data.success) {
      toast.success("Subscription successfull");
    } else {
      toast.error("Subscription Failed, Try again.");
    }
  }
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <motion.div
            initial={{
              x: -50,
              opacity: 0,
              rotate: "-5deg",
            }}
            whileInView={{
              x: 0,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {/* <Image
              src={assets.logo}
              alt="logo"
              className="w-[60px] sm:w-[80px]"
            /> */}
            <h1 className="md:text-4xl text-xl font-semibold">Inkwell.</h1>
          </motion.div>
        </div>
        <Link href="/admin/addBlog">
          <motion.button
            whileHover={{
              scale: 1.05,
              x: 50,
              rotate: "5deg",
              transition: { duration: 0.1, type: "spring", delay: 0 },
            }}
            className="flex cursor-pointer text-sm md:text-base items-center gap-2 font-meduim py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          >
            Get Started <Image src={assets.arrow} alt="" />
          </motion.button>
        </Link>
      </div>
      <div className="my-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-medium sm:text-5xl"
        >
          Latest Blogs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl m-auto mt-10 text-xs sm:text-base"
        >
          Stay updated with the latest insights and trends across Technology,
          Lifestyle, Education, Business and Politics through our most recent
          blog posts.
        </motion.p>
        <motion.form
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          action=""
          className="cursor-pointer shadow-[-7px_7px_0px_#000000] flex justify-between max-w-xl mx-auto mt-10 scale-75 border border-black sm:scale-75"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="outline-none w-full indent-4"
            placeholder="Enter your email"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-4 border-l border-black sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Header;
