import { PageHero } from "@/components/Primitives";
import { getCredentials, getSiteSettings } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Credentials",
  description: "Selected professional certificates and areas of continuing study.",
  path: "/credentials",
});

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
            <article className="credential-card" key={`${credential.title}-${credential.issuer}`}>
              <div className="credential-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="card-kicker">{credential.area}</p>
                <h2>{credential.title}</h2>
                <p>{credential.issuer}</p>
                {credential.credentialId && <small>Credential ID · {credential.credentialId}</small>}
              </div>
              {(credential.year || credential.href) && (
                <div className="credential-tail">
                  {credential.year && <strong>{credential.year}</strong>}
                  {credential.href && <a className="text-link" href={credential.href} target="_blank" rel="noreferrer">Verify ↗</a>}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
