import Link from "next/link";
import { navigation, type PracticeArea, type Profile } from "@/lib/content";

export function SiteFooter({ profile, practiceAreas }: { profile: Profile; practiceAreas: PracticeArea[] }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="contact-band">
        <div className="shell contact-band-inner">
          <div>
            <p className="eyebrow light">Research and professional enquiries</p>
            <h2>Bring the question. We can clarify the evidence.</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-gold" href={`mailto:${profile.email}?subject=Research or professional enquiry`}>
              Start a conversation <span aria-hidden="true">→</span>
            </a>
            <a className="button button-ghost-light" href={`mailto:${profile.email}?subject=Request for CV`}>
              Request CV
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">AM</span>
            <span>
              <strong>Md Asif Mustafa</strong>
              <small>Evidence-led research and systems</small>
            </span>
          </Link>
          <p>
            Working across research, data science, industrial systems and sustainability from Dhaka, Bangladesh.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
            <li><Link href="/credentials">Credentials</Link></li>
          </ul>
        </div>
        <div>
          <h3>Practice</h3>
          <ul>
            {practiceAreas.map((item) => (
              <li key={item.slug}><Link href={`/practice#${item.slug}`}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Connect</h3>
          <ul>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            <li><a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar ↗</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Md Asif Mustafa</span>
        <span>Independent professional portfolio · Dhaka, Bangladesh</span>
      </div>
    </footer>
  );
}
