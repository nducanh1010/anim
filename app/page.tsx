"use client";
import Footer from "@/components/footer";
import Hello from "@/components/hello";
import Image from "next/image";
import styles from "@/styles/mask.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Home() {
  const followerRef = useRef(null);
  useEffect(() => {
    const follower = followerRef.current;
    const windowWidth = window.innerWidth;
    // Create quickTo instances for smooth and performant updates
    const moveX = gsap.quickTo(follower, "x", {
      duration: 2.33,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(follower, "y", {
      duration: 1.2,
      ease: "power3.out",
    });
    const resizeWidth = gsap.quickTo(follower, "width", {
      ease: "power3.out",
      duration: 2.3,
    });

    const onMouseMove = (e: MouseEvent) => {
      const imageWidth = follower.offsetWidth;
      const rightEdge = e.clientX + 50;
      // Check if the image is near the right edge
      if (rightEdge >= windowWidth) {
        moveY(e.clientY);
        moveX(e.clientX + imageWidth / 2);

        resizeWidth(Math.max(windowWidth - e.clientX, 0));
      } else {
        // Reset to default size and follow the pointer
        resizeWidth(50);
        moveX(e.clientX);
        moveY(e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
  };
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
          {/* <Hello />  */}
          <div onClick={toggleDarkMode} className="bg-primary">
            Trigger Dark Mode
          </div>
          <img
            ref={followerRef}
            style={{
              willChange: "transform", // Optimize for performance
            }}
            alt="among-us"
            className="among-us  fixed w-[50px] top-0 left-0 aspect-square pointer-events-none "
            src="/images/among-us.gif"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
