import type { Metadata } from "next";
import { Legal } from "../_components/Legal";
import { terms } from "../_content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: "The terms that govern your use of the Fafoni website and services.",
};

export default function TermsPage() {
  return <Legal doc={terms} />;
}
