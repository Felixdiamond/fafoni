import type { StaticImageData } from "next/image";
import adaeze from "@/public/photos/portrait-adaeze.jpg";
import emmanuel from "@/public/photos/portrait-emmanuel.jpg";
import sarah from "@/public/photos/portrait-sarah.jpg";
import type { Story } from "@/app/_components/Stories";

/** The portrait choices offered in the CMS (the "photo" select on each story in .pages.yml).
 *  Adding a portrait: drop the file in public/photos, import it here, add its key to .pages.yml. */
const portraits: Record<string, StaticImageData> = { adaeze, emmanuel, sarah };

/** Attach the portraits to the stories by key. "none" or an unknown key shows the initials avatar. */
export const withPortraits = (items: readonly (Omit<Story, "photo"> & { photo?: string })[]): Story[] =>
  items.map(({ photo, ...s }) => ({ ...s, photo: photo ? portraits[photo] : undefined }));
