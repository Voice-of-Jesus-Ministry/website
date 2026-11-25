import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Platform Engineer",
  description: "Platform engineering, system architecture, endpoint and identity automation.",
};

const experience: [string, string, string, string[]?][] = [
  ["Amazing Grace Home Living", "Registered Agent and System Administrator", "Apr 2026 – Present", ["Administer hybrid infrastructure across Active Directory, Windows Server, Group Policy, Google Workspace, Google Cloud, and Firebase.", "Build Copilot workflows and administrative automation using PowerShell, Python, JavaScript, and REST APIs.", "Lead security hardening and access reviews, applying least-privilege controls and managing credentials with Google Cloud Secret Manager and Workload Identity Federation."]],
  ["HCLTech · client: Verizon", "EDN Technical Support Engineer II", "Jan 2025 – Apr 2026", ["Supported endpoint and identity platforms across an environment of more than 70,000 users and devices using Intune, Workspace ONE, Entra ID, and Active Directory.", "Built diagnostic and remediation automation using Copilot, PowerShell, and REST APIs for Tier 2 and Tier 3 engineering teams.", "Supported privileged access governance and browser security with Entra ID, Prisma Access Browser, Citrix Enterprise Browser, and Chrome Enterprise."]],
  ["Amazing Grace Home Living", "Registered Agent and System Administrator", "Aug 2023 – Jan 2025", ["Started part-time while completing the Tandym contract, then transitioned to full-time in October 2023.", "Administered Active Directory, Windows Server, Group Policy, and Google Workspace, maintaining role-based access controls and system compliance.", "Built PowerShell, Python, JavaScript, and REST API integrations to streamline provisioning, operational workflows, and developer environment setup."]],
  ["Tandym Group · client: Pansophic Learning", "Technical Support Engineer", "Aug 2022 – Oct 2023", ["Managed Intune, Autopilot, Apple Business Manager, and MDM operations supporting enterprise device lifecycle and zero-touch deployments.", "Automated support processes with PowerShell, reducing downtime by 42% and improving productivity by 15%."]],
  ["Infosys · client: Google", "Technology Analyst", "Feb 2021 – Jun 2022", ["Supported Google Workspace identity operations for more than 350,000 users and migrations involving more than 400,000 accounts.", "Built a technical training portal that helped reduce the engineering backlog by 85%."]],
  ["Allied Universal", "Security Professional", "Oct 2016 – Dec 2021", ["Administered network and identity infrastructure, including Active Directory, Group Policy, MECM/SCCM, Cisco ISE, and Cisco Unified Communications Manager.", "Conducted vulnerability monitoring and endpoint remediation, and managed CCTV and access control integrations."]],
  ["Nielsen Media Research", "EVS Encoder Support Specialist", "Mar 2011 – Oct 2016", ["Supported EVS infrastructure across Windows Server, Linux, UNIX, and VMware; monitored systems and documented troubleshooting procedures."]],
];

export function ProfilePage() {
  return <div className="container page narrow">
    <p className="eyebrow">NICHOLAI MARO MADIAS · NICHOLAI.ONLINE</p>
    <h1>Platform engineering with a human center.</h1>
    <p className="lede">Senior Platform Engineer with 15+ years of experience in endpoint management, identity services, cloud platforms, and IT automation. Experienced in Microsoft Intune, Entra ID, Active Directory, Microsoft 365, PowerShell, and enterprise-scale cloud migrations, with a record of improving security, automation, and operational efficiency.</p>
    <div className="actions"><a className="button" href="https://www.linkedin.com/in/nicholaimadias/">LinkedIn ↗</a><a className="button secondary" href="https://github.com/NicholaiMadias">GitHub ↗</a></div>
    <section className="section"><p className="eyebrow">FOCUS AREAS</p><div className="card-grid two"><div className="feature-card"><h2>Platform & identity</h2><p>Workspace ONE, Intune, MECM/SCCM, Active Directory, Entra ID, Google Workspace, Google Cloud, IAM, and endpoint security.</p></div><div className="feature-card"><h2>Automation & systems</h2><p>PowerShell, Python, JavaScript, REST APIs, Copilot workflows, cloud security, credential management, and operational automation.</p></div></div></section>
    <section className="section"><p className="eyebrow">EXPERIENCE</p>{experience.map(([company, role, dates, highlights]) => <article className="feature-card" key={`${company}-${dates}`}><h2>{role}</h2><p><strong>{company}</strong> · {dates}</p>{highlights && <ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</article>)}</section>
    <section className="section"><p className="eyebrow">EDUCATION</p><div className="feature-card"><h2>Southern New Hampshire University</h2><p>Bachelor of Science in Business Studies, Computer Information Technology</p><h2>Everest University</h2><p>Associate of Science in Computer Information Sciences and Support Services</p></div></section>
    <section className="community-panel"><div><p className="eyebrow">LET’S CONNECT</p><h2>Open to thoughtful systems work.</h2><p>Explore my work on LinkedIn and GitHub using the links above.</p></div></section>
  </div>;
}

export default ProfilePage;
