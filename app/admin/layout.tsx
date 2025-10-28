"use client";
import Sidebar from "@/Componets/AdminComponents/Sidebar";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sideMenu, setSideMenu] = useState(false);
  return (
    <div className="">
      <ToastContainer theme="dark" />
      <div className="flex bg-white fixed top-0 flex-col gap-2 w-full">
        <div className="flex justify-between px-5 sm:px-12 h-[60px] border border-black items-center">
          {/* {sideMenu ? (
            <div
              onClick={() => setSideMenu((prev) => !prev)}
              className="lg:hidden space-y-1"
            >
              <div className="h-1 w-8 rounded-sm bg-black rotate-45"></div>
              <div className="h-1 w-8 rounded-sm bg-black"></div>
            </div>
          ) : (
            <div
              onClick={() => setSideMenu((prev) => !prev)}
              className="lg:hidden space-y-1"
            >
              <div className="h-1 w-8 rounded-sm bg-black"></div>
              <div className="h-1 w-8 rounded-sm bg-black"></div>
              <div className="h-1 w-8 rounded-sm bg-black"></div>
            </div>
          )} */}
          <div
            onClick={() => setSideMenu((prev) => !prev)}
            className="lg:hidden space-y-1"
          >
            <div
              className={`h-1 w-8 rounded-sm ${
                sideMenu && "rotate-45 top-1"
              } bg-black duration-500 transition-all relative `}
            ></div>
            <div
              className={`h-1 w-8 ${sideMenu && "hidden"} rounded-sm bg-black`}
            ></div>
            <div
              className={`h-1 w-8 rounded-sm ${
                sideMenu && "-rotate-45 -top-1 "
              } bg-black duration-500 transition-all relative `}
            ></div>
          </div>

          <p className="font-medium">Admin Panel</p>
          <Image src={`/author_img.png`} height={40} width={40} alt="profile-icon" />
        </div>
      </div>
      <div className=" mt-15">
        <div className="hidden fixed left-0 w-[30%] lg:block">
          <Sidebar />
        </div>
        <AnimatePresence>
          {sideMenu && (
            <motion.div
              initial={{
                x: -10,
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              exit={{
                x: -10,
                opacity: 0,
              }}
              className="fixed w-[70%] lg:hidden z-10"
            >
              <Sidebar setSideMenu={setSideMenu} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:ml-[30%]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
