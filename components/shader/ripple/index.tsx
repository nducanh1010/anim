"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Model } from "./model";

interface RippleShaderProps {
  images?: string[];
}

const RippleShaderComponent = ({
  images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
}: RippleShaderProps) => {
  return (
    <div className="h-screen w-full relative">
      <Canvas>
        <Model images={images} />
      </Canvas>
    </div>
  );
};

// Export the component as client-only to prevent Next.js hydration mismatches
// and server-side WebGL compilation issues.
export const RippleShader = dynamic(() => Promise.resolve(RippleShaderComponent), {
  ssr: false,
});

export default RippleShader;
