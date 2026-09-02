import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getCredentials, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Selected professional certificates and areas of continuing study.",
  alternates: { canonical: "/credentials" },
};

export const revalidate = 60;

export default async function CredentialsPage() {
  const [credentials, settings] = await Promise.all([getCredentials(), getSiteSettings()]);
  const copy = settings.pages.credentials;
  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <section className="section section-ash composed-section">
        <div className="shell credential-grid">
          {credentials.map((credential, index) => (
            <Reveal key={`${credential.title}-${credential.issuer}`} delay={(index % 3) * 60}>
              <article className="credential-card">
                <div className="credential-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="card-kicker">{credential.area}</p>
                  <h2>{credential.title}</h2>
                  <p>{credential.issuer}</p>
                  {credential.credentialId && <small>Credential ID · {credential.credentialId}</small>}
                </div>
                <div className="credential-tail">
                  {credential.year && <strong>{credential.year}</strong>}
                  {credential.href
                    ? <a className="text-link" href={credential.href} target="_blank" rel="noreferrer">Verify ↗</a>
                    : <span>Credential record</span>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
