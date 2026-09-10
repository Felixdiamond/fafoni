import Image, { type StaticImageData } from "next/image";

type Props = {
  photo: StaticImageData;
  statement: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

/** Closing: one line of the client's, scrubbed in over a darkened photograph; the two actions; contact. */
export function Closing({ photo, statement, body, primary, secondary }: Props) {
  return (
    <section className="close" aria-labelledby="closing-title">
      <div className="close__media" aria-hidden="true" data-speed="0.82">
        <Image src={photo} alt="" fill sizes="100vw" placeholder="blur" />
      </div>
      <div className="close__scrim grain" aria-hidden="true" />
      <div className="wrap close__inner">
        <h2 id="closing-title" className="close__statement" data-split="scrub">
          {statement}
        </h2>
        <div className="close__row">
          <div className="close__stack">
            <p className="close__body">{body}</p>
            <div className="close__actions">
            <a className="btn btn--accent btn--lg" href={primary.href}>
              {primary.label}
            </a>
            <a className="link-cta link-cta--plate" href={secondary.href} data-quiz>
              {secondary.label}{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
