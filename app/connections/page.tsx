export default function Connections() {
  return (
    <div className="container page">
      <p className="eyebrow">CONNECTIONS · PLANNED</p>
      <h1>Your tools. Your choice.</h1>
      <p className="lede">
        The next phase will let you bring your own storage and AI services into
        one workspace. Connections are not available in this release.
      </p>
      <div className="card-grid section">
        <article className="feature-card">
          <span className="tag">PLANNED</span>
          <h2>Cloud storage</h2>
          <p>
            Choose files to open or save with a connected provider. Local
            downloads already work in the workspace.
          </p>
        </article>
        <article className="feature-card">
          <span className="tag">PLANNED</span>
          <h2>Coding & images</h2>
          <p>
            Use a supported AI provider with clear usage limits. Your provider’s
            API charges would remain separate from practice XP.
          </p>
        </article>
        <article className="feature-card">
          <span className="tag">PLANNED</span>
          <h2>Scripts & workflows</h2>
          <p>
            Start with reviewed workflows. Custom code will need isolated
            execution and explicit permission before it can run.
          </p>
        </article>
      </div>
      <p className="notice">
        We are not collecting API keys or cloud credentials. Account security,
        revocable connections, and server-side protections come before enabling
        these features.
      </p>
    </div>
  );
}
