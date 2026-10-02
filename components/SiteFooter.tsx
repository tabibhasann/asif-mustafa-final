import Link from "next/link";
import type { Profile, SiteSettings } from "@/lib/content";
import { headerLinks, knowledgeLinks } from "@/lib/site";

const footerLinks = [...headerLinks, ...knowledgeLinks];
const profileLinks = footerLinks.filter((item) => ["/about", "/practice", "/experience", "/credentials"].includes(item.href));
const workLinks = footerLinks.filter((item) => !profileLinks.includes(item));

export function SiteFooter({
  profile,
  settings,
}: {
  profile: Pick<Profile, "name" | "role" | "email" | "phone" | "linkedin" | "scholar" | "github" | "youtube" | "location" | "cvUrl">;
  settings: SiteSettings["footer"];
}) {
  return (
    <footer className="site-footer" id="contact">
      <div className="contact-band">
        <div className="shell contact-band-inner">
          <div>
            <p className="eyebrow light">{settings.eyebrow}</p>
            <h2>{settings.title}</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-gold" href={`mailto:${profile.email}?subject=Research or professional enquiry`}>
              {settings.primaryCta} <span aria-hidden="true">→</span>
            </a>
            <a
              className="footer-cv-link"
              href={profile.cvUrl || `mailto:${profile.email}?subject=Request for CV`}
              target={profile.cvUrl ? "_blank" : undefined}
              rel={profile.cvUrl ? "noreferrer" : undefined}
            >
              {settings.secondaryCta}
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link className="brand footer-brand" href="/" prefetch={false}>
            <span className="brand-mark" aria-hidden="true">AM</span>
            <span>
              <strong>{profile.name}</strong>
            </span>
          </Link>
          <p>{settings.summary}</p>
        </div>
        {[{ title: "Profile", links: profileLinks }, { title: "Work & writing", links: workLinks }].map((group) => (
          <nav className="footer-nav" aria-label={group.title} key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.links.map((item) => (
              <li key={item.href}><Link href={item.href} prefetch={false}>{item.label}</Link></li>
            ))}</ul>
          </nav>
        ))}
        <div className="footer-connect">
          <h3>Connect</h3>
          <ul className="footer-contact-list">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
          </ul>
          <ul className="footer-social-list" aria-label="Professional profiles">
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            <li><a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar ↗</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
            {profile.youtube && <li><a href={profile.youtube} target="_blank" rel="noreferrer">YouTube ↗</a></li>}
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
