"use client";
import BlogList from "@/Componets/BlogList";
import Header from "@/Componets/Header";
import Footer from "../Componets/Footer";
const Home = () => {
  return (
    <div className=" relative">
      <Header />
      <BlogList />
      <Footer />
    </div>
  );
};

export default Home;
