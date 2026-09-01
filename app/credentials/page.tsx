import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { Reveal } from "@/components/Reveal";
import { getCredentials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Selected professional certificates and areas of continuing study.",
};

export const revalidate = 60;

export default async function CredentialsPage() {
  const credentials = await getCredentials();
  return (
    <>
      <PageHero
        eyebrow="Credentials"
        title="Continuing study across data, AI and industrial systems."
        intro="A selected credential record. Certificate links, dates and identifiers remain editable in Sanity so the published archive can stay accurate."
      />
      <section className="section section-ash">
        <div className="shell credential-grid">
          {credentials.map((credential, index) => (
            <Reveal key={`${credential.title}-${credential.issuer}`} delay={(index % 3) * 60}>
              <article className="credential-card">
                <div className="credential-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="card-kicker">{credential.area}</p>
                  <h2>{credential.title}</h2>
                  <p>{credential.issuer}</p>
                </div>
                {credential.href ? <a className="text-link" href={credential.href} target="_blank" rel="noreferrer">Verify ↗</a> : <span>Record</span>}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
