import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black justify-around w-full  gap-2 flex text-white items-center flex-col sm:flex-row ">
      <h1 className="md:text-4xl text-xl font-semibold">Inkwell.</h1>
      <p className="font-semibold">All Rights Reserved. Copyright @inkwell</p>
      <div className="flex gap-2 py-2">
        <Image src={assets.facebook_icon} alt="" />
        <Image src={assets.twitter_icon} alt="" />
        <Image src={assets.googleplus_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
