const LAST_UPDATED = "2026-06-03";

export function Now() {
  return (
    <article className="measure text-ink">
      <header className="mb-space-7">
        <p className="uppercase-eyebrow">now</p>
        <h1 className="mt-space-3 text-h1">What I am doing.</h1>
        <p className="mt-space-4 text-ink-mute">
          A page that says what I am doing. Updated {LAST_UPDATED}, and
          rewritten when it stops being true.
        </p>
      </header>

      <Section title="Working on">
        A small mapping tool for a friend who runs a neighborhood food
        tour. TypeScript, MapLibre, a very small API. The kind of work
        that lives or dies on whether the labels are readable at zoom 14
        on a phone in afternoon sun.
      </Section>

      <Section title="Reading">
        <em>The Mushroom at the End of the World</em>, Anna Tsing.{" "}
        <em>A Field Guide to Getting Lost</em>, Rebecca Solnit. Halfway
        through both. Taking notes in a paper notebook, not an app.
      </Section>

      <Section title="In ho chi minh city">
        Sunny. 33 degrees. The kind of heat that makes you walk slowly
        and read more than you build.
      </Section>

      <Section title="Not doing">
        Conferences for a while. A newsletter. A podcast. The list of
        things I am not doing is longer than the list of things I am,
        and that is a good sign.
      </Section>

      <footer className="mt-space-8 border-t border-rule pt-space-4">
        <p className="text-xs text-ink-faint">
          247 people have visited this site. (That number is a footnote,
          not a metric.)
        </p>
      </footer>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-space-6">
      <h2 className="text-xs uppercase tracking-caps text-ink-mute font-medium">
        {title}
      </h2>
      <div className="mt-space-2 text-base text-ink leading-body">
        {children}
      </div>
    </section>
  );
}
