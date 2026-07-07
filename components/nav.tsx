"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import Magnetic from "@/components/magnetic";

type NavItem = { href: string; label: string; external?: boolean };

const items: NavItem[] = [
  { href: "/", label: "home" },
  { href: "/blog", label: "journal" },
  { href: "/visitors", label: "now" },
];

export function Navbar({ ref }: { ref?: React.Ref<HTMLDivElement> }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[var(--z-nav)] border-b border-rule bg-surface-0/85 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-space-4 px-gutter py-space-3">
        <Link
          href="/"
          className="font-display text-base font-semibold text-ink-strong tracking-tight"
        >
          anh nd<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-space-1">
          {items.map((item) => {
            const isCurrent =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            );
          })}
          <Magnetic>
            <div className="relative flex items-center justify-center p-2">
              {/* <div ref={ref} className="sticky-cursor-target absolute inset-0 z-0 bg-transparent hover:scale-[2.5] transition-transform duration-200 cursor-pointer" /> */}
              <div ref={ref} className="relative z-10 pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
