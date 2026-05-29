"use client";
import Footer from "@/components/footer";
import Hello from "@/components/hello";
import Image from "next/image";
import styles from "@/styles/mask.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Home() {

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
  };
  return (
    <>
      <div onClick={toggleDarkMode} className="bg-primary">
        Trigger Dark Mode
      </div>
    </>
  );
}
