/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { assets } from "@/Assets/assets";
import Footer from "@/Componets/Footer";
import axios from "axios";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Comments from "@/Componets/Comments";

interface PropTypes {
  params: Promise<{ id: string }>;
}
const Page = ({ params }: PropTypes) => {
  console.log(params);
  const [data, setData] = useState<{
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    author: string;
    authorImg: string;
  } | null>(null);

  const fetchData = async () => {
    const { id } = await params;
    const response = await axios.get("/api/blog?id=" + id);
    setData(response.data.blog);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="py-5  h-[450px]  bg-gray-200">
      <div className="flex items-center justify-between lg:px-28 md:px-12">
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
            <h1 className="text-xl font-semibold md:text-4xl">Inkwell.</h1>
          </motion.div>
        </div>

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
      </div>
      {data ? (
        <>
          <div className="my-24 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold sm:text-5xl max-w-[700px] mx-auto"
            >
              {data.title}
            </motion.h1>
            <Image
              width={20}
              height={20}
              className="w-15 mx-auto mt-6 border-white rounded-full"
              src={data.authorImg}
              alt=""
            />
            <p className="mt-1 pb-2 text-lg  mx-auto">{data.author}</p>
          </div>
          <div className="mx-5 max-w-4xl mt-[-100px]  md:mx-auto  mb-10">
            <Image
              width={600}
              height={300}
              className="border-4 w-full  border-white"
              src={data.image}
              alt=""
            />
            <p className="text-base my-5 ">{data.description}</p>

            <div className="mt-16 font-semibold">
              Share this article on social media
            </div>
            <div className="flex gap-2 mt-3">
              <Image src={assets.facebook_icon} alt="" />
              <Image src={assets.twitter_icon} alt="" />
              <Image src={assets.googleplus_icon} alt="" />
            </div>
            <Comments id={data._id} />
          </div>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
