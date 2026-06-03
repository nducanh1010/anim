import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/nav";
import { SkipLink } from "@/components/skip-link";
import Footer from "@/components/footer";
import Hello from "@/components/hello";

// Local script font for the handwritten signature role.
// System fonts cover display, body, and mono. This is intentional: it
// keeps the build offline-safe and ships zero web-font requests above
// the fold. The choice is documented in the project README.
const dnCursive = localFont({
  src: "../public/fonts/DN Cursive Regular.ttf",
  variable: "--font-script",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "hien vu. independent builder, ho chi minh city",
  description:
    "Small, considered things for the web. Journal, projects, and a now page.",
};

// Inline script that runs before first paint: applies the saved or
// system-preferred theme class to <html> to avoid a flash of wrong theme.
const themeScript = `
(() => {
  try {
    const saved = window.localStorage.getItem('next_anim:theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefers ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={dnCursive.variable}
        suppressHydrationWarning
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="bg-surface-0 text-ink font-body antialiased">
          <SkipLink />
          <Hello />
          <Navbar />
          <main id="main" className="mx-auto max-w-[80rem] px-gutter pb-space-9 pt-space-7">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
