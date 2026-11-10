import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import photos from "../../../content/gallery.json";

export const metadata: Metadata = {
 title: "Mission 2026: Living by Grace, Walking by Faith | Voice of Jesus Ministry",
 description: "Celebrate Mission 2026: 45 students reached, over 100 meals served, and a coastal community growing in faith and fellowship."
};
const groups = ["The journey of faith", "Reaching the next generation", "Inspirational moments"];
export default function Mission2026() {
 return <article className="container page mission-page">
  <header className="mission-heading"><p className="eyebrow">VOICE OF JESUS MINISTRY · MISSION 2026</p>
   <h1>Living by grace.<br />Walking by faith.</h1>
   <p className="lede">A journey of hope, nourishment, and fellowship in a remote coastal community.</p>
   <a className="text-link" href="#mission-gallery">Explore the photo gallery ↓</a>
  </header>
  <div className="mission-impact" aria-label="Mission 2026 progress reported by the ministry">
   <p><strong>45</strong><span>students reached</span></p><p><strong>100+</strong><span>meals served</span></p><p><strong>One shared calling</strong><span>to love, serve, and walk by faith</span></p>
  </div>
  <section className="mission-letter prose" aria-labelledby="mission-thanks"><h2 id="mission-thanks">Dear ministry family and friends,</h2>
   <p>Grace and peace to you in the name of our Lord Jesus Christ. As we look back on the journey of Mission 2026, our hearts overflow with gratitude for your prayers, encouragement, and faithful partnership.</p>
   <p>Your shared heart for the Gospel helps us reach remote coastal communities with the light of Christ. Please take a moment to explore this gallery and celebrate the joy, nourishment, and fellowship your generosity has made possible. We are blessed to walk this path of faith together.</p>
   <p>Because of your prayers, generosity, and faith, we have reached <strong>45 students and served over 100 meals so far in 2026</strong>. Your partnership supports faith-based community outreach dedicated to serving and sustaining an isolated coastal settlement.</p>
  </section>
  <section className="mission-support" aria-labelledby="support-heading"><p className="eyebrow">SUPPORT OUR VILLAGE OPERATIONS</p><h2 id="support-heading">Strengthening the lifelines of community.</h2>
   <p>Under Pastor Allan's leadership, the ministry is working to sustain coastal operations, strengthen community resilience, and expand outreach. The shelters where children gather provide a foundation for nourishment, youth summer camps, Bible teaching, and fellowship.</p>
   <div className="mission-priorities"><div><h3>Safe water</h3><p>A dependable water supply for daily community needs.</p></div><div><h3>Classroom solar power</h3><p>Reliable power to support teaching and learning.</p></div><div><h3>A lifeline boat motor</h3><p>A robust marine engine to maintain essential transportation and support community safety.</p></div></div>
   <p>These are ongoing needs. Thank you for being the hands and feet of Jesus with us.</p>
   <a className="text-link" href="https://gofund.me/6a70a3e0f" target="_blank" rel="noopener noreferrer">Support Pastor Allan's village ministry ↗</a>
   <p className="quiet">Visit the fundraiser for operational updates, infrastructure goals, and donations.</p>
  </section>
  <section id="mission-gallery" className="mission-gallery" aria-labelledby="gallery-heading"><p className="eyebrow">MISSION 2026 PHOTO GALLERY</p><h2 id="gallery-heading">The people. The journey. The fellowship.</h2>
   {groups.map(group => <section key={group} className="mission-album" aria-label={group}><h3>{group}</h3><div className="mission-photo-grid">
    {photos.filter(photo => photo.category === group).map(photo => <figure key={photo.id}>
     <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`View full photo: ${photo.title}`}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 100vw, 50vw" /></a>
     <figcaption><h4>{photo.title}</h4><p>{photo.caption}</p></figcaption>
    </figure>)}
   </div></section>)}
  </section>
  <section className="mission-prayer prose" aria-labelledby="prayer-heading"><p className="eyebrow">A PRAYER OF THANKSGIVING</p><h2 id="prayer-heading">Every student. Every meal. Every heart.</h2>
   <p>Heavenly Father, we praise You for Your steadfast faithfulness and for the beautiful ways You have guided and protected Voice of Jesus Ministry throughout Mission 2026. Thank You for every student reached, every meal served, and every heart touched by Your love.</p>
   <p>We place our remote coastal community into Your hands. Continue to secure our operations, strengthen our infrastructure, and provide the vital assets needed to keep this settlement stable and safe. Pour out an abundant blessing upon every partner and supporter who has given out of their own harvest to sustain ours.</p>
   <p>May all that we do bring honor and glory to Your name. In Jesus’ name, Amen.</p>
   <Link className="text-link" href="/bible-study">Continue with a Bible study →</Link>
  </section>
 </article>;
}
