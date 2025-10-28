"use client";
import Image from "next/image";
import React from "react";

interface Props {
  id: string;
  author: string;
  authorImg: string;
  title: string;
  deleteBlog: (id: string) => Promise<void>;
  key?: number;
  createdAt: string;
}
const BlogListItem = ({
  id,
  author,
  authorImg,
  title,
  deleteBlog,
  createdAt,
}: Props) => {
  const blogDate = new Date(createdAt).toDateString();
  return (
    <tr className=" border-b-1 border-b-gray-200">
      <td className="px-5 py-2 flex items-center gap-2">
        <Image src={authorImg} width={45} height={45} alt="authorImg" />
        <p>{author}</p>
      </td>
      <td className="px-5 py-2">{title.slice(0,20)}...</td>
      <td className="px-5 py-2">{blogDate}</td>
      <td onClick={() => deleteBlog(id)} className="px-5  py-2 ">
        <button className="hover:bg-gray-400  rounded-full w-10 h-10 cursor-pointer  ">
          x
        </button>
      </td>
    </tr>
  );
};

export default BlogListItem;
