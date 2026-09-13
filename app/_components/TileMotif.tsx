import Image from "next/image";
import adaeze from "@/public/photos/portrait-adaeze.jpg";
import emmanuel from "@/public/photos/portrait-emmanuel.jpg";

/** One large centred object per text tile, built in HTML and CSS. */
export function TileMotif({ kind }: { kind: "training" | "guidance" | "career" }) {
  if (kind === "training") {
    return (
      <div className="obj obj--certs" aria-hidden="true">
        <span className="cert cert--3">CAPM<sup>®</sup></span>
        <span className="cert cert--2">PRINCE2<sup>®</sup></span>
        <span className="cert cert--1">PMP<sup>®</sup></span>
      </div>
    );
  }
  if (kind === "guidance") {
    return (
      <div className="obj obj--session" aria-hidden="true">
        <span className="session__frame">
          <Image src={adaeze} alt="" width={200} height={200} sizes="200px" />
        </span>
        <span className="session__badge">
          <span className="session__dot" />
          Live session
        </span>
        <span className="session__peer">
          <Image src={emmanuel} alt="" width={64} height={64} sizes="64px" />
        </span>
      </div>
    );
  }
  return (
    <div className="obj obj--cv" aria-hidden="true">
      <span className="cv__page">
        <span className="cv__name" />
        <span className="cv__line cv__line--70" />
        <span className="cv__line cv__line--50" />
        <span className="cv__gap" />
        <span className="cv__line cv__line--90" />
        <span className="cv__line cv__line--80" />
        <span className="cv__line cv__line--60" />
      </span>
      <span className="cv__stamp">Offer received</span>
    </div>
  );
}
