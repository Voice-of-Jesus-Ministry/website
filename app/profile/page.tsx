import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Platform Engineer",
  description: "Platform engineering, system architecture, endpoint and identity automation.",
};

const experience = [
  ["Amazing Grace Home Living", "Platform Engineer", "Apr 2026 – Present"],
  ["HCLTech · client: Verizon", "EDN Technical Support Engineer II", "2025 – Apr 2026"],
  ["IAGG Investments", "Developer, freelance", "Oct 2023 – Jan 2025"],
  ["Tandym Group", "Technical Support Engineer II", "Aug 2022 – Oct 2023"],
  ["Infosys · client: Google", "Technical Support Engineer II & IAM Support Engineer", "Feb 2021 – Apr 2022"],
  ["Allied Universal", "Network & Security Administrator", "Sep 2016 – Feb 2021"],
  ["Nielsen Media Research", "Network Administrator & EVS Support Specialist", "Mar 2011 – Oct 2016"],
];

export function ProfilePage() {
  return <div className="container page narrow">
    <p className="eyebrow">NICHOLAI MARO MADIAS · NICHOLAI.ONLINE</p>
    <h1>Platform engineering with a human center.</h1>
    <p className="lede">I design reliable systems across endpoint management, identity, automation, cloud operations, and web experiences—then make them understandable enough for people to use well.</p>
    <div className="actions"><a className="button" href="https://www.linkedin.com/in/nicholaimadias/">LinkedIn ↗</a><a className="button secondary" href="https://github.com/Amazing-Grace-Home-Living/website">GitHub ↗</a></div>
    <section className="section"><p className="eyebrow">FOCUS AREAS</p><div className="card-grid two"><div className="feature-card"><h2>Platform & identity</h2><p>Workspace ONE, Intune, MECM/SCCM, Active Directory, Entra ID, Google Workspace, IAM, Zero Trust, and endpoint security.</p></div><div className="feature-card"><h2>Automation & systems</h2><p>PowerShell, Python, JavaScript, SQL, REST APIs, dashboards, workflow design, documentation, and local-first web applications.</p></div></div></section>
    <section className="section"><p className="eyebrow">EXPERIENCE</p>{experience.map(([company, role, dates]) => <article className="feature-card" key={company}><h2>{role}</h2><p><strong>{company}</strong> · {dates}</p></article>)}</section>
    <section className="community-panel"><div><p className="eyebrow">SOURCE OF TRUTH</p><h2>Open to thoughtful systems work.</h2><p>This profile uses the same chronology and titles as the master resume. Tailored versions should preserve the dates and emphasize the skills most relevant to the role.</p></div></section>
  </div>;
}

export default ProfilePage;
