import { assets, blog_data } from "@/Assets/assets";
import Image, { StaticImageData } from "next/image";
import React from "react";

type BlogTypes = {
  title: string;
  description: string;
  category: string;
  image: StaticImageData;
};
const Blogitem = ({ title, description, category, image }: BlogTypes) => {
  return (
    <div className="max-w-[330px]  sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Image
        src={image}
        alt="blog_image"
        width={400}
        height={400}
        className="border-b border-black"
      />
      <p className="inline-block px-1 mt-5 ml-5 text-sm text-white bg-black">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">
          {description}
        </p>
        <div className="flex items-center py-2 font-semibold text-center">
          Read more <Image src={assets.arrow} alt="" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Blogitem;
