import BestSelling from "@/components/BestSelling";
import CategoryGrid from "@/components/CategoryGrid";
import Releases from "@/components/Releases";
import ShopBlocks from "@/components/ShopBlocks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* XL and above Background Image - Beautiful Dogs and Cats */}
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero XL - Dogs and Cats"
          className="hidden xl:block absolute inset-0 w-full h-full object-cover"
        />

        {/* LG Background Image - Cute Dogs */}
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Hero LG - Cute Dogs"
          className="hidden md:block xl:hidden absolute inset-0 w-full h-full object-cover"
        />

        {/* Mobile Background Image - Adorable Cats */}
        <img
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Hero Mobile - Adorable Cats"
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content positioned with responsive alignment */}
        <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[5%] -translate-y-1/2 -translate-x-1/2 lg:translate-x-0 z-10 px-4 sm:px-8 md:px-12">
          <div className="text-white text-center max-w-xl space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Find Your Perfect Companion
            </h1>
            <p className="text-sm md:text-lg font-medium text-gray-200">
              Loving Pets. Forever Homes
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dogs">
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold text-sm rounded-md px-4 py-2 font-mono">
                  Adopt Dogs
                </Button>
              </Link>
              <Link to="/cats">
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold text-sm rounded-md px-4 py-2 font-mono">
                  Adopt Cats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Releases />
      <CategoryGrid />
      <BestSelling />
      <section className="w-full py-20 px-4 text-center bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-wider font-medium mb-4 underline underline-offset-4">
            Our Mission
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug sm:leading-snug">
            We're Dedicated to Finding Loving Homes<br />
            for Every Dog and Cat in Need.
          </h2>
        </div>
      </section>
      <ShopBlocks />
      <section className="flex flex-col items-center justify-center gap-5 px-5 py-[5rem] bg-slate-100">
        <div className="w-50% mx-auto flex justify-center items-center flex-col gap-[3rem]">
          <div className="flex items-center justify-center w-full gap-2">
            <img src={"https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"} alt="Dog" className="w-16 h-16 object-cover rounded" />
            <img src={"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"} alt="Cat" className="w-16 h-16 object-cover rounded" />
          </div>
        </div>
      </section>
    </>
  );
}