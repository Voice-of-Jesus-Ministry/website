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
      <h2>Accounts and connections</h2>
      <p>
        This release does not collect passwords, AI API keys, payment details,
        or cloud-storage credentials. Connections are planned and unavailable.
      </p>
      <h2>External services</h2>
      <p>
        Following a link to YouTube, Messenger, or GitHub opens that service,
        which has its own privacy practices. This app does not embed their
        players or add advertising or analytics scripts. The hosting service may
        process ordinary request information, such as IP addresses and access
        logs.
      </p>
      <h2>Shared devices</h2>
      <p>
        Local storage is not a private vault. People using the same browser
        profile may see your results and notes. Avoid sensitive information and
        clear your notes after using a shared device.
      </p>
    </div>
  );
}
