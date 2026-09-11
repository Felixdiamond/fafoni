import type { StaticImageData } from "next/image";
import adaeze from "@/public/photos/portrait-adaeze.jpg";
import emmanuel from "@/public/photos/portrait-emmanuel.jpg";
import blessing from "@/public/photos/portrait-blessing.jpg";
import type { Story } from "@/app/_components/Stories";

const portraits: Record<string, StaticImageData> = {
  "Adaeze T.": adaeze,
  "Emmanuel K.": emmanuel,
  "Blessing A.": blessing,
};

/** Attach the client-supplied portraits to the stories by name. */
export const withPortraits = (items: readonly Omit<Story, "photo">[]): Story[] =>
  items.map((s) => ({ ...s, photo: portraits[s.name] }));
