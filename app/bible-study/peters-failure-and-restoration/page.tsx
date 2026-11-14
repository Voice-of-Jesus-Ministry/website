import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Peter’s Failure and Restoration | Voice of Jesus Ministry",
  description: "From the courtyard to the shore: a Bible study on Peter’s denial, the mercy of Jesus, and a renewed calling. With Scripture, reflection questions, and prayer.",
};

export default function PetersRestoration() {
  return (
    <article className="container page study-article">
      <Link className="text-link study-back" href="/bible-study">← All Bible studies</Link>
      <header className="study-header">
        <p className="eyebrow">GRACE & DISCIPLESHIP · 5 MIN READ</p>
        <h1>From the Courtyard to the Shore: Peter’s Failure and Restoration</h1>
        <p className="lede">How Jesus meets our weakness with truth, mercy, and a renewed calling.</p>
      </header>
      <aside className="notice study-readings" aria-label="Scripture readings">
        <strong>Read alongside this study</strong>
        <p><a href="https://www.biblegateway.com/passage/?search=Luke%2022%3A31-34%2C54-62&version=KJV">Luke 22:31–34, 54–62</a> · <a href="https://www.biblegateway.com/passage/?search=John%2018%3A10-18%2C25-27&version=KJV">John 18:10–18, 25–27</a> · <a href="https://www.biblegateway.com/passage/?search=Matthew%2027%3A3-5&version=KJV">Matthew 27:3–5</a> · <a href="https://www.biblegateway.com/passage/?search=John%2021%3A1-19&version=KJV">John 21:1–19</a></p>
      </aside>
      <div className="prose study-prose">
        <p>Peter believed he would stand with Jesus whatever the cost. Yet within hours, he denied knowing Him three times. His story confronts us with an uncomfortable question: What happens when our actions fail to match the faith we profess?</p>
        <p>The answer unfolds between two fires—one in a courtyard, where Peter denied Jesus, and another beside the sea, where Jesus restored him.</p>

        <h2>A sincere promise, an untested confidence</h2>
        <p>Peter’s devotion was real. He declared himself ready to face prison and death with Jesus. When the arresting party arrived in the garden, he drew his sword and struck the high priest’s servant. Jesus stopped him. Peter was willing to fight, but he had not yet learned what faithful surrender would require. <a href="https://www.biblegateway.com/passage/?search=Luke%2022%3A31-34%3BJohn%2018%3A10-11&version=KJV">Luke 22:31–34; John 18:10–11</a></p>
        <p>His mistake was trusting his own resolve too completely. We can make the same mistake when we assume that strong feelings, good intentions, or past courage guarantee future faithfulness.</p>

        <h2>When fear takes over</h2>
        <p>Later, Peter stood among servants and guards warming themselves around a charcoal fire. Questions about his connection to Jesus brought repeated denials. The man who had drawn a sword now struggled to acknowledge his Teacher. <a href="https://www.biblegateway.com/passage/?search=John%2018%3A15-18%2C25-27&version=KJV">John 18:15–18, 25–27</a></p>
        <p>The Gospel accounts do not describe every thought passing through Peter’s mind. Still, his circumstances suggest the pressure of fear and self-preservation. Each accusation made his association with Jesus more dangerous.</p>
        <p>That helps us recognize his weakness without excusing his choice. Fear can explain our failures while leaving us responsible for them.</p>

        <h2>The look that broke through</h2>
        <p>Then the rooster crowed.</p>
        <p>Luke records that Jesus turned and looked at Peter. Peter remembered the warning, left the courtyard, and wept bitterly. Scripture does not describe Jesus’ expression, so we should resist filling it with details the text does not supply. What Luke makes clear is the effect: Peter could no longer hide from what he had done. <a href="https://www.biblegateway.com/passage/?search=Luke%2022%3A54-62&version=KJV">Luke 22:54–62</a></p>
        <p>His tears invite us to consider the grief of failing someone deeply loved. The confident image he held of himself had collapsed. Honest repentance begins in that difficult place where we stop defending ourselves.</p>

        <h2>Grief does not have to end in despair</h2>
        <p>Judas also experienced profound remorse. Matthew describes his acknowledgment of wrongdoing and his tragic death. Peter’s story, however, continues into an encounter with the risen Jesus. We should approach this contrast with compassion, without claiming to know every dimension of either man’s inner life. <a href="https://www.biblegateway.com/passage/?search=Matthew%2027%3A3-5&version=KJV">Matthew 27:3–5</a></p>
        <p>For the reader, the invitation is clear: bring guilt into the presence of Christ. Failure need not become a final verdict on our worth or our future.</p>

        <h2>Another charcoal fire</h2>
        <p>After the resurrection, Jesus met the disciples beside the Sea of Tiberias. A charcoal fire, bread, and fish awaited them. John’s repeated mention of a charcoal fire connects this breakfast with the earlier courtyard scene. <a href="https://www.biblegateway.com/passage/?search=John%2021%3A1-14&version=KJV">John 21:1–14</a></p>
        <p>After the meal, Jesus asked Peter three times, “Do you love me?” Each answer was followed by a responsibility to care for His flock.</p>
        <p>The three questions echo the three denials. This is a compelling narrative parallel: Jesus brings Peter’s love and failure into the open, then entrusts him with meaningful service. Restoration includes both relationship and responsibility. <a href="https://www.biblegateway.com/passage/?search=John%2021%3A15-19&version=KJV">John 21:15–19</a></p>
        <p>Peter’s failure was not a qualification for leadership. Christ’s grace restored him, and the memory of his weakness could deepen the humility and compassion with which he served.</p>

        <h2>Bringing the story into our lives</h2>
        <p>Peter’s journey invites us to examine where we rely on ourselves, acknowledge where fear has shaped our choices, and receive the mercy Jesus offers.</p>
        <p>Restoration may involve confession, changed behavior, repairing harm, and patiently rebuilding trust. Peter’s renewed calling reminds us that forgiveness can lead us back into faithful service.</p>

        <section className="study-reflection" aria-labelledby="reflection-heading">
          <h2 id="reflection-heading">Questions for reflection</h2>
          <ol>
            <li>Where have I confused sincere intentions with dependable strength?</li>
            <li>What fears make it difficult for me to acknowledge or obey Jesus?</li>
            <li>Is there a failure I need to bring honestly before Him?</li>
            <li>How can receiving mercy make me more compassionate toward others?</li>
          </ol>
          <Link className="text-link" href="/tools">Write a reflection in your workspace →</Link>
        </section>
        <h2>Prayer</h2>
        <p>Lord Jesus, You know both our love and our weakness. Give us courage to face our failures honestly and trust Your mercy. Replace self-confidence with dependence on You, and teach us to care for others with humility. Amen.</p>
      </div>
    </article>
  );
}
