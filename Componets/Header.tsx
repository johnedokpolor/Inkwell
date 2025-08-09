import Image from "next/image";
import React from "react";
import { assets } from "@/Assets/assets";
import { motion } from "motion/react";

const Header = () => {
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <motion.div
            initial={{
              x: -20,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <Image
              src={assets.logo}
              alt="logo"
              className="w-[60px] sm:w-[80px]"
            />
          </motion.div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            x: 50,
            rotate: "5deg",
            transition: { duration: 0.1, delay: 0 },
          }}
          className="flex cursor-pointer items-center gap-2 font-meduim py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
        >
          Get Started <Image src={assets.arrow} alt="" />
        </motion.button>
      </div>
      <div className="my-8 text-center">
        <h1 className="text-3xl font-medium sm:text-5xl">Latest Blogs</h1>
        <p className="max-w-2xl m-auto mt-10 text-xs sm:text-base">
          Stay updated with the latest insights and trends across Technology,
          Lifestyle, Education, Business and Politics through our most recent
          blog posts.
        </p>
        <form
          action=""
          className=" shadow-[-7px_7px_0px_#000000] flex justify-between max-w-xl mx-auto mt-10 scale-75 border border-black sm:scale-75"
        >
          <input
            type="email"
            className="outline-none indent-4"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="px-4 py-4 border-l border-black sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
