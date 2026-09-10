'use client';

import { FormEvent, useEffect, useState } from 'react';

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`kh-mark${compact ? ' kh-mark--compact' : ''}`} aria-hidden="true">
      <span>KH</span>
    </span>
  );
}

const journey = [
  {
    year: '1998',
    eyebrow: 'Starting early',
    title: 'Mentor Technologies at 17',
    body: 'I started Mentor Technologies in Tulsa in 1998. Running a company became my education in customers, teams, and the everyday decisions that come with ownership.',
  },
  {
    year: 'GROWTH',
    eyebrow: 'Building and combining',
    title: 'Organic growth, three acquisitions, and a merger',
    body: 'Alongside organic growth, I purchased three technology companies, merged a phone and cabling company into the operation, and built Reflection Backup Solutions.',
  },
  {
    year: 'EXIT',
    eyebrow: 'Completing a chapter',
    title: 'Selling what I had built',
    body: 'Mentor, Reflection Backup Solutions, and the acquired and merged operations came together as one business. I then sold that combined company.',
  },
  {
    year: 'TODAY',
    eyebrow: 'A new chapter',
    title: 'Starting TechSavvy Consulting',
    body: 'After the sale, I started TechSavvy Consulting, bringing the experience of growing and integrating companies into a new chapter of business ownership.',
  },
];

export default function Home() {
  const [contactInView, setContactInView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus('submitting');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Formspree rejected the submission.');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('[data-reveal]').forEach((item) => revealObserver.observe(item));

    const contact = document.getElementById('contact');
    const contactObserver = contact
      ? new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { threshold: 0.08 })
      : null;
    if (contact && contactObserver) contactObserver.observe(contact);

    return () => {
      revealObserver.disconnect();
      contactObserver?.disconnect();
    };
  }, []);

  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kyle Hearn home">
          <Mark compact />
          <span><strong>Kyle Hearn</strong><small>Hope-Giving Builder</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#building">Service</a>
          <a href="#journey">Journey</a>
          <a href="#identity">Identity</a>
        </nav>
        <span className="header-location">Tulsa, Oklahoma</span>
        <div className="mobile-nav">
          <button
            className="mobile-nav-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-explore-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            Explore <span aria-hidden="true">{mobileMenuOpen ? '×' : '＋'}</span>
          </button>
          <nav
            className={`mobile-nav-menu${mobileMenuOpen ? ' mobile-nav-menu--open' : ''}`}
            id="mobile-explore-menu"
            aria-label="Explore this page"
          >
            <a href="#building" onClick={() => setMobileMenuOpen(false)}>How I serve</a>
            <a href="#wired" onClick={() => setMobileMenuOpen(false)}>How I&apos;m wired</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)}>My journey</a>
            <a href="#identity" onClick={() => setMobileMenuOpen(false)}>My identity</a>
            <a href="#beyond" onClick={() => setMobileMenuOpen(false)}>Beyond the work</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>

      <a
        className={`floating-connect${contactInView ? ' floating-connect--hidden' : ''}`}
        href="#contact"
        aria-label="Go to the contact form"
      >
        <span className="connect-label connect-label--full">Let&apos;s connect</span>
        <span className="connect-label connect-label--mobile">Connect</span>
        <b>↘</b>
      </a>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>Faith</span><i /><span>Family</span><i /><span>Community</span><i /><span>Building</span></p>
          <h1 id="hero-title">I believe in what people can <em>become.</em></h1>
          <p className="hero-lede">Hi, I&apos;m Kyle Hearn—a husband, father, and entrepreneur in Tulsa. I follow Jesus, love my family, and bring a lifelong curiosity to technology and business. These days, you&apos;ll find me growing TechSavvy Consulting, exploring AI, and sharing what I learn. I&apos;m a <strong>Hope-Giving Builder</strong>, and this is a little of my story.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#building">See how I serve <span>↘</span></a>
            <a className="button button-quiet" href="#journey">Follow my journey <span>↓</span></a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="portrait-rings" aria-hidden="true" />
          <div className="portrait-window">
            <picture>
              <source
                type="image/webp"
                srcSet="/kyle-sport-coat-640.webp 640w, /kyle-sport-coat-1000.webp 1000w"
                sizes="(max-width: 780px) calc(100vw - 84px), 440px"
              />
              <img
                src="/kyle-sport-coat-1000.jpg"
                alt="Kyle Hearn smiling in a navy sport coat"
                width="1000"
                height="1000"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className="portrait-note">
            <span>✦</span>
            <p><strong>Hope-Giving Builder</strong><small>An identity from Christ. A calling to give hope and build what helps.</small></p>
          </div>
        </div>

      </section>

      <section className="throughline section-dark">
        <div className="section-shell throughline-grid" data-reveal>
          <p className="section-label">What drives me</p>
          <div>
            <h2>My faith shapes <em>my priorities.</em></h2>
            <p>I serve Jesus first. That starts with how I show up for my family and extends to the way I run a business and participate in Tulsa&apos;s community. I want the people who know me personally to recognize the same person they meet at work.</p>
          </div>
        </div>
      </section>

      <section className="building section-building" id="building">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <p className="section-label">How I serve today</p>
            <h2>Where I put my experience to work.</h2>
          </div>

          <div className="venture-grid">
            <a className="venture-card venture-card--featured" href="https://www.techsavvy.consulting/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">SERVICE · OWNERSHIP · COMMUNITY</span>
              <div><h3>TechSavvy<br />Consulting</h3></div>
              <p>I&apos;m growing a Tulsa IT company that feels like part of your staff. We get to know your business, look after its technology, and care about where you want it to go.</p>
              <b>Visit TechSavvy <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ai" href="https://www.youtube.com/@YouCanMakeItWithAI" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">TEACHING · CREATIVITY · ACCESS</span>
              <div><h3>You Can Make It<br />With AI</h3></div>
              <p>I explore what people can create with plain-English instructions and modern AI tools. The channel shares examples and the steps behind them, so you can try things for yourself.</p>
              <b>Explore the channel <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ideas" href="https://www.linkedin.com/in/kylehearn/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">MENTORING · BUSINESS · CONVERSATION</span>
              <div><h3>Conversations &amp;<br />shared experience</h3></div>
              <p>Mentoring gives me a place to talk through decisions with other owners. On LinkedIn, I share observations about business, leadership, and technology.</p>
              <b>Follow along on LinkedIn <span>↗</span></b>
            </a>
          </div>

          <div className="credentials-panel" data-reveal>
            <div className="credentials-intro">
              <p className="section-label">Continued learning</p>
              <h3>Keeping my knowledge current.</h3>
              <p>Recent training covers cybersecurity fundamentals, HIPAA responsibilities, and practical AI.</p>
              <a href="https://www.linkedin.com/in/kylehearn/details/certifications/" target="_blank" rel="noreferrer">View credentials on LinkedIn <span>↗</span></a>
            </div>
            <div className="credential-list" aria-label="Current professional certifications">
              <article>
                <span>Cybersecurity</span>
                <strong>Fortinet NSE 1 Certified in Cybersecurity</strong>
                <small>Fortinet · Current through 2028</small>
              </article>
              <article>
                <span>Healthcare</span>
                <strong>HIPAA for Business Associates</strong>
                <small>HIPAA Exams · Issued 2026</small>
              </article>
              <article>
                <span>Artificial intelligence</span>
                <strong>Google AI Professional Certificate</strong>
                <small>Google · Issued 2026</small>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="wired section-wired" id="wired" aria-labelledby="wired-title">
        <div className="section-shell">
          <div className="wired-heading" data-reveal>
            <p className="section-label">How I&apos;m wired</p>
            <div>
              <h2 id="wired-title">Commander drive.<br /><em>Coach approach.</em></h2>
              <p>My personal assessments describe both a desire to accomplish things and a patient, relational way of working with people. Here is what each one adds to that picture.</p>
            </div>
          </div>

          <div className="assessment-grid">
            <article data-reveal>
              <p className="assessment-source">16Personalities · ENTJ-A</p>
              <h3>Commander</h3>
              <p>This result reflects an outgoing, organized approach to goals and decisions. It offers language for the part of me that likes a challenge, thinks ahead, and wants to move from discussion to action.</p>
            </article>
            <article data-reveal>
              <p className="assessment-source">DISC &amp; Motivators</p>
              <h3>Coach</h3>
              <p>My DISC report emphasizes listening, patience, and warmth. It describes someone who can stay with a complex project and help people work together, without needing to be the center of attention.</p>
            </article>
            <article data-reveal>
              <p className="assessment-source">Enneagram · 3w2</p>
              <h3>Achievement &amp; connection</h3>
              <p>My test suggests Type 3 with a Two wing: a focus on achievement alongside an interest in people and connection. It invites me to reflect on what motivates my ambition and how I define success.</p>
            </article>
          </div>

          <div className="assessment-reflection" data-reveal>
            <div>
              <h3>Talking with me</h3>
              <p>My DISC report recommends candid, patient conversation, time to connect, written details, and an agreed next step. That is a useful picture of the collaboration I value.</p>
            </div>
            <div>
              <h3>Questions worth keeping</h3>
              <p>The Coach report flags overcommitting and hesitating on difficult decisions. Alongside the achievement focus of 3w2, it gives me questions to revisit: Am I being clear? Do I have capacity? Am I letting results define my worth?</p>
            </div>
          </div>
          <p className="assessment-note">I use these assessments for reflection. They describe tendencies, with room for experience and the people who know me to challenge the results.</p>
        </div>
      </section>

      <section className="journey section-journey" id="journey">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <p className="section-label">My journey</p>
            <h2>The path from Mentor to TechSavvy.</h2>
          </div>

          <div className="timeline">
            {journey.map((chapter, index) => (
              <article className="timeline-row" key={chapter.year} data-reveal>
                <div className="timeline-year"><span>{chapter.year}</span><i /></div>
                <div className="timeline-copy">
                  <span>{chapter.eyebrow}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.body}</p>
                </div>
                <span className="timeline-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="identity" id="identity">
        <div className="identity-glow" aria-hidden="true" />
        <div className="section-shell identity-layout">
          <div className="identity-title" data-reveal>
            <p className="section-label">Why Hope-Giving Builder</p>
            <h2>Hope came before <em>the name.</em></h2>
          </div>
          <div className="identity-copy" data-reveal>
            <p className="identity-lede"><strong>Hope-Giving Builder is the identity I believe Christ gave me.</strong> Jamie Winship&apos;s teaching on true identity prompted me to search myself, pray, and listen for an answer.</p>
            <p>Looking back, I noticed a pattern: I had recognized ability in people and encouraged them to start businesses of their own. Several now lead successful companies. Their stories helped me understand the hope-giving part—seeing what God may be forming in someone before they fully see it themselves.</p>
            <p>The builder part came from creating my own companies. Together, those experiences gave me language for something I believe Christ was already showing me.</p>
            <a href="https://www.identityexchange.com/" target="_blank" rel="noreferrer">Learn about Identity Exchange <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="beyond section-paper" id="beyond">
        <div className="section-shell beyond-layout">
          <div className="beyond-photo" data-reveal>
            {/* A plain image keeps the static GitHub Pages export predictable while loading this below-the-fold photo lazily. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/family.jpg" alt="Kyle Hearn enjoying an evening of cards outdoors with his family" width="2048" height="1536" loading="lazy" decoding="async" />
            <span>Family time · Tulsa, Oklahoma</span>
          </div>
          <div className="beyond-copy" data-reveal>
            <p className="section-label">Beyond the work</p>
            <h2>Away from the desk.</h2>
            <p>I love time with my family, including an evening of cards in the backyard. I also enjoy getting outside, staying active, dancing, and making music.</p>
            <div className="interest-list"><span>Rock climbing</span><span>Hiking</span><span>West Coast Swing</span><span>Bowling</span><span>Strength Training</span><span>Playing Guitar</span></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-shell contact-layout">
          <div className="contact-intro" data-reveal>
            <p className="section-label">Let&apos;s connect</p>
            <h2>I&apos;d enjoy hearing from you.</h2>
            <p>Have a question, want to compare notes, or just say hello? Send me a message—I read it personally.</p>
          </div>
          <form className="contact-form" action="https://formspree.io/f/xppzzbog" method="POST" onSubmit={handleContactSubmit} data-formspree-connected="true" data-reveal>
            <input type="hidden" name="_subject" value="New message from KyleHearn.com" />
            <label><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="How should I address you?" /></label>
            <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            <label><span>What&apos;s on your mind?</span><textarea name="message" rows={5} required placeholder="A little context is plenty." /></label>
            <label className="honeypot" aria-hidden="true"><span>Leave this empty</span><input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></label>
            <div className="form-submit">
              <button type="submit" disabled={formStatus === 'submitting'}>{formStatus === 'submitting' ? 'Sending…' : 'Send message'} <b>↗</b></button>
              <p className={`form-status form-status--${formStatus}`} aria-live="polite">
                {formStatus === 'success' && 'Thank you—your message has been sent.'}
                {formStatus === 'error' && 'Something went wrong. Please try again.'}
                {formStatus === 'idle' && 'Your message will be sent securely through Formspree.'}
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><Mark compact /><span><strong>Kyle Hearn</strong><small>People · Ideas · Technology</small></span></div>
        <nav aria-label="External links">
          <a href="https://www.techsavvy.consulting/" target="_blank" rel="noreferrer">TechSavvy <span>↗</span></a>
          <a href="https://www.linkedin.com/in/kylehearn/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://www.youtube.com/@YouCanMakeItWithAI" target="_blank" rel="noreferrer">YouTube <span>↗</span></a>
        </nav>
        <p><span>Tulsa, Oklahoma</span><span>© Kyle Hearn</span></p>
      </footer>
    </main>
  );
}
