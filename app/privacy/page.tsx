export default function Privacy() {
  return (
    <div className="container page narrow prose">
      <p className="eyebrow">PRIVACY</p>
      <h1>Your data in this release.</h1>
      <h2>Practice results and notes</h2>
      <p>
        The app saves practice results and workspace notes in this browser’s
        local storage. They are not synchronized to an account or sent to an AI
        service. Clearing browser data removes them. Workspace notes can be
        downloaded as text.
      </p>
      <h2>Data collected</h2>
      <p>
        This release does not collect passwords, AI API keys, payment details,
        or cloud-storage credentials.
      </p>
      <h2>External services</h2>
      <p>When member accounts are enabled, Clerk handles sign-in and account registration, including Google sign-in and email links. Account providers process the information needed to authenticate you. Photo and video submissions are not available in this release.</p>
      <p>
        Following a link to Blogger, YouTube, Messenger, or GitHub opens that service,
        which has its own privacy practices. This app does not embed their
        players or add advertising scripts. The hosting service may
        process ordinary request information, such as IP addresses and access
        logs.
      </p>
      <h2>Visitor analytics</h2>
      <p>We use Vercel Web Analytics for aggregate page views and referrals without analytics cookies. Query strings and URL fragments are removed before page-view events are sent. We do not send workspace notes, quiz answers, uploaded documents, or account details as analytics events.</p>
      <h2>Shared devices</h2>
      <p>
        Local storage is not a private vault. People using the same browser
        profile may see your results and notes. Avoid sensitive information and
        clear your notes after using a shared device.
      </p>
    </div>
  );
}
