import type { Metadata } from "next";
import { Legal } from "../_components/Legal";
import { privacy } from "../_content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: "How Fafoni collects, uses, stores and protects your personal information.",
};

export default function PrivacyPage() {
  return <Legal doc={privacy} />;
}
