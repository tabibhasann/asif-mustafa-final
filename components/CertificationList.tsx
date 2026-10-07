import type { Credential } from "@/lib/content";

type CertificationListProps = {
  credentials: Credential[];
  headingLevel?: "h2" | "h3";
};

export function CertificationList({
  credentials,
  headingLevel = "h3",
}: CertificationListProps) {
  const Heading = headingLevel;

  return (
    <div className="certification-list">
      {credentials.map((credential) => (
        <article
          className="certification-entry"
          key={`${credential.title}-${credential.issuer}`}
        >
          <div className="certification-header">
            {credential.area && (
              <p className="card-kicker">{credential.area}</p>
            )}
            <Heading>{credential.title}</Heading>
            <p className="certification-issuer">{credential.issuer}</p>
            {(credential.credentialId || credential.courseInfo) && (
              <div className="certification-meta">
                {credential.credentialId && (
                  <p>Credential ID: {credential.credentialId}</p>
                )}
                {credential.courseInfo && <p>{credential.courseInfo}</p>}
              </div>
            )}
            {!!credential.stack?.length && (
              <ul
                className="certification-topics"
                aria-label="Course topics and technologies"
              >
                {credential.stack.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            )}
          </div>
          {(credential.year || credential.href) && (
            <div className="certification-actions">
              {credential.year && <span>{credential.year}</span>}
              {credential.href && (
                <a
                  className="text-link"
                  href={credential.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Verify ${credential.title} in a new tab`}
                >
                  Verify credential <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
