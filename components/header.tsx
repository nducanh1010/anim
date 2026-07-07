'use client';

import React, { useRef } from "react";
import { Navbar } from "./nav";
import StickyCursor from "./sticky-cursor";

export default function Header() {
  const stickyElement = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </>
  );
}
