const links: { href: string; label: string }[] = [
  { href: "/rss.xml", label: "rss" },
  { href: "https://github.com/ducanh", label: "github" },
  { href: "mailto:hello@example.com", label: "email" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-space-9 border-t border-rule">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-space-5 px-gutter py-space-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ul className="flex flex-wrap items-center gap-x-space-5 gap-y-space-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-sm text-ink-mute"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-space-3 text-xs text-ink-faint">
            (c) {year} hien vu. Last rebuilt in jun 2026.
          </p>
        </div>
        <p
          className="font-script text-[1.6rem] leading-none text-signature"
          aria-label="signature"
        >
          hien.
        </p>
      </div>
    </footer>
  );
}
