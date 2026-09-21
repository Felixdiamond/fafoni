import Link from "next/link";
import type { LegalBlock, LegalDoc } from "@/app/_content/legal";

type Heading = Extract<LegalBlock, { t: "h2" }>;

/** A legal document: navy title band, sticky contents on desktop, the text on paper.
 *  No scroll animation here on purpose — legal copy should render and stay put. */
function Value({ value }: { value: string }) {
  if (value.startsWith("/")) return <Link href={value}>{value === "/privacy" ? "Read our Privacy Policy" : value}</Link>;
  if (value.includes("@")) return <a href={`mailto:${value}`}>{value}</a>;
  if (value.startsWith("www.")) return <a href={`https://${value}`}>{value}</a>;
  return <>{value}</>;
}

export function Legal({ doc }: { doc: LegalDoc }) {
  const sections = doc.blocks.filter((b): b is Heading => b.t === "h2");
  return (
    <>
      <header className="lhero">
        <div className="wrap lhero__inner">
          <p className="lhero__eyebrow">Fafoni</p>
          <h1 className="lhero__title">{doc.title}</h1>
          {doc.updated ? <p className="lhero__meta">Last updated {doc.updated}</p> : null}
        </div>
      </header>

      <div className="wrap legal">
        <nav className="legal__toc" aria-label="Contents">
          <p className="legal__toc-head">Contents</p>
          <ol className="legal__toc-list">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.text}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="legal__body">
          {doc.blocks.map((b, i) => {
            if (b.t === "h2") return <h2 key={b.id} id={b.id}>{b.text}</h2>;
            if (b.t === "h3") return <h3 key={i}>{b.text}</h3>;
            if (b.t === "p") return <p key={i}>{b.text}</p>;
            if (b.t === "ul")
              return (
                <ul key={i}>
                  {b.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return (
              <dl key={i} className="legal__kv">
                {b.rows.map(([k, v]) => (
                  <div key={k + v}>
                    <dt>{k}</dt>
                    <dd>
                      <Value value={v} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          })}
        </article>
      </div>
    </>
  );
}
