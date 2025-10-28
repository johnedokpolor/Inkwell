import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction, Dispatch } from "react";

const Sidebar = ({
  setSideMenu,
}: {
  setSideMenu?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-slate-100 h-[100vh] w-full border border-black">
      <div className="h-[60px] flex items-center justify-center">
        <div className="flex gap-2">
          <h1 className="text-2xl font-medium text-center">InkWell.</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-black border-t-1 py-10 ">
        <Link
          onClick={() => setSideMenu && setSideMenu(false)}
          href={"/admin/addBlog"}
          className="flex px-4 cursor-pointer gap-2 w-[75%] ml-auto py-2 items-center border border-black shadow-[-7px_7px_0px_#000000] hover:w-[80%] hover:bg-gray-300 transition-all duration-300"
        >
          <Image src={assets.add_icon} width={28} alt="" />
          <p className="font-medium">Add blog</p>
        </Link>
        <Link
          onClick={() => setSideMenu && setSideMenu(false)}
          href={"/admin/blogList"}
          className="flex px-4 gap-2 w-[75%] ml-auto py-2 items-center border border-black shadow-[-7px_7px_0px_#000000] hover:w-[80%] hover:bg-gray-300 transition-all duration-300"
        >
          <Image src={assets.blog_icon} width={28} alt="" />
          <p className="font-medium">Blog Lists</p>
        </Link>
        <Link
          onClick={() => setSideMenu && setSideMenu(false)}
          href={"/admin/subscriptions"}
          className="flex px-4 gap-2 w-[75%] ml-auto py-2 items-center border border-black shadow-[-7px_7px_0px_#000000] hover:w-[80%] hover:bg-gray-300 transition-all duration-300"
        >
          <Image src={assets.email_icon} width={28} alt="" />
          <p className="font-medium">Subscriptions</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
