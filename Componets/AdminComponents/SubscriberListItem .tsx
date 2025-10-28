"use client";
import Image from "next/image";
import React from "react";

interface Props {
  email: string;
  createdAt: string;
  deleteSubscriber: () => Promise<void>;
}
const BlogListItem = ({ email, createdAt, deleteSubscriber }: Props) => {
  const subscriberDate = new Date(createdAt).toDateString();
  return (
    <tr className=" border-b-1 border-b-gray-200">
      <td className="px-5 py-2">{email}</td>
      <td className="px-5 py-2">{subscriberDate}</td>
      <td onClick={deleteSubscriber} className="px-5  py-2 ">
        <button className="hover:bg-gray-400  rounded-full w-10 h-10 cursor-pointer  ">
          x
        </button>
      </td>
    </tr>
  );
};

export default BlogListItem;
