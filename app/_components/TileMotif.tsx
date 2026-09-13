import Image from "next/image";
import adaeze from "@/public/photos/portrait-adaeze.jpg";
import emmanuel from "@/public/photos/portrait-emmanuel.jpg";
import blessing from "@/public/photos/portrait-blessing.jpg";

/** Small pieces of real content that give the text tiles a subject without turning them into photos. */
export function TileMotif({ kind }: { kind: "training" | "guidance" | "career" }) {
  if (kind === "training") {
    return (
      <ul className="motif motif--modules" aria-hidden="true">
        <li>Project planning and delivery</li>
        <li>Risk and stakeholder management</li>
        <li>Agile and hybrid project management</li>
      </ul>
    );
  }
  if (kind === "guidance") {
    return (
      <div className="motif motif--people" aria-hidden="true">
        <span className="motif__faces">
          <Image src={adaeze} alt="" width={44} height={44} sizes="44px" />
          <Image src={emmanuel} alt="" width={44} height={44} sizes="44px" />
          <Image src={blessing} alt="" width={44} height={44} sizes="44px" />
        </span>
        <span className="motif__caption">Experienced project managers</span>
      </div>
    );
  }
  return (
    <ol className="motif motif--steps" aria-hidden="true">
      <li>CV</li>
      <li>Interview</li>
      <li>Offer</li>
    </ol>
  );
}
