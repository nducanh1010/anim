import Link from "next/link";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="hero-band">
      <p className="hero-band__eyebrow">
        <span className="uppercase-eyebrow">independent builder</span>
        <span aria-hidden="true"> · </span>
        <span className="uppercase-eyebrow">HAN</span>
      </p>

      <h1 id="hero-heading" className="hero-band__heading">
        I make small, considered things for{" "}
        <em className="hero-band__flourish">the web</em>.
      </h1>

      <p className="hero-band__body">
        Sometimes that is an interface, sometimes a map, sometimes a
        long sentence I wanted to keep somewhere. I write about it here.
      </p>

      <p className="hero-band__now">
        currently building{" "}
        <Link href="/now" className="hero-band__now-link">
          @n1
        </Link>
        <span aria-hidden="true"> · </span>
        <span>open to interesting work</span>
      </p>
    </section>
  );
}
