import React from "react";
import Spline from "@splinetool/react-spline/next";
import HeroSection from "@/components/sections/HeroSection";
import IdentitySection from "@/components/sections/IdentitySection";

const page = () => {
  return (
    <>
      {/* <Spline
        className="w-full h-full"
        scene="https://prod.spline.design/epRk5J3rZZYI1UHE/scene.splinecode"
      /> */}
      <HeroSection />
      <IdentitySection />
    </>
  );
};

export default page;
