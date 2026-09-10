import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/Nav";
import { hero } from "./_content/home";
import { links, quiz } from "./_content/links";
import { SiteFooter } from "./_components/SiteFooter";
import { Smooth } from "./_components/Smooth";
import { Quiz } from "./_components/Quiz";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: ["normal"],
  display: "swap",
  variable: "--font-newsreader",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: {
    default: "Fafoni — Project management training and career support",
    template: "%s — Fafoni",
  },
  description:
    "Get certified, build in-demand skills and gain the qualifications employers are looking for — and take your career global with visa sponsorship opportunities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${newsreader.variable} ${plex.variable} h-full antialiased`}
    >
      <head>
        {/* Marks the document as JS-capable before paint so reveals never hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav ctaHref={links.bookConsultation} ctaLabel={hero.primary} />
        <Smooth>
          {children}
          <SiteFooter />
        </Smooth>
        <Quiz src={quiz.embed} label={quiz.label} title={quiz.title} note={quiz.note} />
      </body>
    </html>
  );
}
