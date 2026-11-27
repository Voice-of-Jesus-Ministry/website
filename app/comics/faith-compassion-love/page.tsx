import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Activities from "./activities";
const art="/media/Team/618EEFC5-71A3-4AB6-91AD-C454A38DEDBF.png";
export const metadata: Metadata={title:"Faith, Compassion & Love in Action | Ministry Comics",description:"Chapter 2: bring hope to children, families and communities through compassionate service. Includes a free Bible quiz and family mission.",alternates:{canonical:"/comics/faith-compassion-love"},openGraph:{images:[art]}};
export default function LoveInAction(){return <div className="container page narrow">
<Link href="/comics">← All comics</Link>
<p className="eyebrow">FAITH IN ACTION · CHAPTER 2</p>
<h1>Faith, Compassion &amp; Love in Action</h1>
<p className="lede">Together we bring hope to the world — one child, one family, one act of love at a time.</p>
<figure style={{margin:"1rem 0"}}><Image src={art} alt="Ministry comic showing faith, compassion and love, volunteers teaching children, and four Scripture references for service." width={1248} height={1248} sizes="(max-width: 768px) 100vw, 768px" style={{width:"100%",height:"auto"}}/><figcaption>Ministry artwork · Faith, Compassion &amp; Love in Action.</figcaption></figure>
<h2>Read along</h2><p>With faith, compassion and love, we can bring hope to the world.</p><p>Together, we teach, encourage and make a difference, because God’s love reaches every heart.</p>
<h2>Scripture for our mission</h2><ul><li><strong>1 Peter 4:10</strong> — Use the gifts you have received to serve others.</li><li><strong>Colossians 3:23</strong> — Work wholeheartedly as unto the Lord.</li><li><strong>Romans 14:12</strong> — Each of us is accountable to God.</li><li><strong>Matthew 25:21</strong> — Be a good and faithful servant.</li></ul>
<h2>Explore the lesson</h2><p>Read Luke 10:25–37, the parable of the Good Samaritan. Consider how compassion moves us beyond words to practical service.</p><blockquote>“My little children, let us not love in word, neither in tongue; but in deed and in truth.” — 1 John 3:18 (KJV)</blockquote>
<h2>Family reflection</h2><ul><li>Who might need encouragement today?</li><li>Which gift can you share with someone else?</li><li>How can your family show kindness without seeking recognition?</li></ul>
<p><strong>Prayer:</strong> Lord Jesus, help us see the needs of others, respond with compassion, and serve faithfully with the gifts You have given us. Amen.</p>
<Activities/>
<p><Link href="/comics/responsibility-faithfulness-in-action">← Chapter 1: Responsibility</Link></p><p><Link href="/bible-study/responsibility">Explore the related Bible study and quiz →</Link></p>
</div>}
