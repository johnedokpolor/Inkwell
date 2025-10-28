import { assets } from "@/Assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type BlogTypes = {
  title: string;
  description: string;
  category: string;
  image: string;
  id: string;
};
const Blogitem = ({ title, description, category, image, id }: BlogTypes) => {
  return (
    <Link href={`blogs/${id}`}>
      {" "}
      <div className="max-w-[330px]  sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
        <Image
          src={image}
          alt="blog_image"
          width={400}
          height={400}
          className="border-b w-full h-[200px] border-black"
        />
        <p className="inline-block px-2 rounded-sm mt-5 ml-5 text-sm text-white bg-black">
          {category}
        </p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {title.slice(0,50)}...
          </h5>
          <p className="mb-3 text-sm tracking-tight text-gray-700">
            {description.slice(0,100)}...
          </p>
          <div className="flex items-center py-2 font-semibold text-center">
            Read more <Image src={assets.arrow} alt="" className="ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Blogitem;
