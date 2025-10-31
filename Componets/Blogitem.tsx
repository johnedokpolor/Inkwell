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
  createdAt: string;
};
const Blogitem = ({
  title,
  description,
  category,
  image,
  id,
  createdAt,
}: BlogTypes) => {
  const date = new Date(createdAt).toDateString();
  return (
    <Link href={`blogs/${id}`}>
      <div className="w-[330px]  sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] rounded-md">
        <Image
          src={image}
          alt="blog_image"
          width={400}
          height={400}
          className="border-b w-full h-[200px] object-cover border-black"
        />

        <div className="flex justify-between items-center">
          <p className="inline-block px-2 rounded-sm mt-5 ml-5 text-sm text-white bg-black">
            {category}
          </p>
          <p className="text-sm text-slate-600 mt-5 mr-5">{date}</p>
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </h5>
          <p className="mb-3 text-sm tracking-tight text-gray-700">
            {description.slice(0, 100)}...
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
