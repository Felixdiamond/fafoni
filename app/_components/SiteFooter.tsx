import Image from "next/image";
import Link from "next/link";
import logo from "@/public/fafoni-logo-trimmed.png";
import { tagline } from "@/app/_content/home";
import { email, links, phone } from "@/app/_content/links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot" id="contact">
      <div className="wrap foot__inner">
        <div className="foot__mast">
          <Link href="/" className="foot__brand" aria-label="Fafoni home">
            <Image src={logo} alt="Fafoni" sizes="(min-width: 60rem) 176px, 40vw" />
          </Link>
          <p className="foot__tag">{tagline}</p>
        </div>
        <ul className="foot__links">
          <li>
            <Link href={links.services} className="foot__link">
              Services
            </Link>
          </li>
          <li>
            <Link href={links.about} className="foot__link">
              About
            </Link>
          </li>
          <li>
            <a href={`mailto:${email}`} className="foot__link">
              {email}
            </a>
          </li>
          <li>
            <a href={phone.href} className="foot__link">
              {phone.display}
            </a>
          </li>
        </ul>
        <p className="foot__meta">
          <span>© {year} Fafoni. All rights reserved.</span>
          <span>Project management ecosystem</span>
        </p>
      </div>
    </footer>
  );
}
