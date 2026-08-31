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
    body: 'I started Mentor Technologies in Tulsa while I was still a teenager. I knew technology, but running the company taught me the deeper work: earn trust, care for the customer, keep learning, and take responsibility when something matters.',
  },
  {
    year: 'GROWTH',
    eyebrow: 'Building and combining',
    title: 'Organic growth, three acquisitions, and a merger',
    body: 'I grew Mentor organically, purchased three technology companies, merged a phone and cabling company into the operation, and built Reflection Backup Solutions. Those pieces were eventually brought together as one company.',
  },
  {
    year: 'EXIT',
    eyebrow: 'Completing a chapter',
    title: 'Selling what I had built',
    body: 'I sold the combined business I had spent years building. The exit mattered, but the greater education came from serving customers, leading a team, integrating companies, and carrying responsibility when the answer was not obvious.',
  },
  {
    year: 'TODAY',
    eyebrow: 'Serving in new ways',
    title: 'TechSavvy, teaching, and community',
    body: 'Today I build TechSavvy to serve as real IT staff for growing businesses, share what I am learning through You Can Make It With AI, encourage other builders, and invest in my family and community.',
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
          <p className="hero-lede">Hi, I&apos;m Kyle Hearn—a follower of Jesus, husband, father, Tulsa entrepreneur, and <strong>Hope-Giving Builder</strong>. I started Mentor Technologies at 17 and spent the years that followed growing, acquiring, merging, and eventually selling the company I built. Today I serve through TechSavvy Consulting, the You Can Make It With AI channel, mentoring, and work in my community. I love helping people recognize what is possible, take ownership, and build something that matters.</p>
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
            <h2>Service is the thread running through <em>everything I build.</em></h2>
            <p>I serve Jesus first, then my family, my community, and the people entrusted to me. That service takes different forms: building a company that helps businesses grow, encouraging someone to become an owner, sharing what I have learned through YouTube, or simply showing up when someone needs help. I love the work because I love seeing people gain confidence, take ownership, and move into what they are capable of.</p>
          </div>
        </div>

        <div className="section-shell pillars" data-reveal>
          <article><span>FAITH</span><h3>Serve Jesus first</h3><p>Faith gives my work its purpose and shapes how I treat the people involved. The goal is not simply to succeed; it is to serve faithfully with what I have been given.</p></article>
          <article><span>PEOPLE</span><h3>See what others can become</h3><p>Some of the most meaningful moments in my life have been encouraging people to become owners. Several now lead successful companies of their own.</p></article>
          <article><span>BUILDING</span><h3>Turn hope into something real</h3><p>Hope becomes useful when it turns into a decision, a business, a team, a tool, or a next step someone can own.</p></article>
        </div>
      </section>

      <section className="building section-building" id="building">
        <div className="section-shell">
          <div className="section-heading section-heading--split" data-reveal>
            <div><p className="section-label">How I serve today</p><h2>One calling, expressed in different ways.</h2></div>
            <p>The businesses, the channel, mentoring, and community involvement are not separate identities. They are ways I can use what I have learned to help someone else move forward.</p>
          </div>

          <div className="venture-grid">
            <a className="venture-card venture-card--featured" href="https://www.techsavvy.consulting/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">SERVICE · OWNERSHIP · COMMUNITY</span>
              <div><h3>TechSavvy<br />Consulting</h3></div>
              <p>Building a Tulsa IT company that works like part of the client&apos;s staff—not a distant outsourced vendor. We learn the business, care about its growth, and take responsibility for the technology behind it.</p>
              <b>Visit TechSavvy <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ai" href="https://www.youtube.com/@YouCanMakeItWithAI" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">TEACHING · CREATIVITY · ACCESS</span>
              <div><h3>You Can Make It<br />With AI</h3></div>
              <p>Giving people a practical way to explore AI and turn plain-English ideas into working tools. I share the process because useful knowledge should create more builders, not just more spectators.</p>
              <b>Explore the channel <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ideas" href="https://www.linkedin.com/in/kylehearn/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">MENTORING · SHARING · ENCOURAGING</span>
              <div><h3>Helping other builders<br />move forward</h3></div>
              <p>I share lessons from building, buying, merging, and selling companies—and encourage people when I see a business owner or builder in them before they see it themselves.</p>
              <b>Follow along on LinkedIn <span>↗</span></b>
            </a>
          </div>

          <div className="credentials-panel" data-reveal>
            <div className="credentials-intro">
              <p className="section-label">Continued learning</p>
              <h3>Keep learning so I can serve responsibly.</h3>
              <p>Experience matters, but service also requires humility. New risks, tools, and responsibilities deserve current training and careful judgment.</p>
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
              <h2 id="wired-title">I see possibilities—and then <em>I start building.</em></h2>
              <p>I tend to notice connections between people, ideas, and systems. I ask questions until I understand what matters, then look for a way to turn the answer into something another person can use. I care deeply about the people involved and take responsibility seriously.</p>
            </div>
          </div>

          <div className="wired-grid">
            <article data-reveal>
              <h3>Notice the potential</h3>
              <p>I often see ability in people before they are ready to name it themselves. Encouraging that possibility is one of the ways I most naturally serve.</p>
            </article>
            <article data-reveal>
              <h3>Give ideas a structure</h3>
              <p>An idea becomes useful when it has an owner, a first step, and enough structure to survive beyond the original conversation.</p>
            </article>
            <article data-reveal>
              <h3>Care enough to be candid</h3>
              <p>Serving someone sometimes means encouragement; sometimes it means saying the honest thing and staying present while they decide what to do with it.</p>
            </article>
            <article data-reveal>
              <h3>Build beyond myself</h3>
              <p>I do not want to remain the permanent bottleneck. I want to build companies, systems, and people that can grow beyond my direct involvement.</p>
            </article>
          </div>

          <p className="wired-note" data-reveal>Assessments have described me as both Commander and Coach. The Coach fits the way I listen and encourage; the Commander fits the part of me that wants to turn a good conversation into <strong>something real.</strong></p>
        </div>
      </section>

      <section className="journey section-journey" id="journey">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <p className="section-label">My journey</p>
            <h2>I learned business by taking responsibility for one.</h2>
            <p>Starting at 17 meant learning in public. Growth, acquisitions, merging teams, and selling taught me that what you build matters most when it genuinely serves people.</p>
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
            <p className="identity-lede"><strong>Hope-Giving Builder is the identity I believe Christ gave me.</strong> Jamie Winship&apos;s teaching on true identity gave me a reason to search myself honestly, pray, and listen for an answer instead of choosing a title that merely sounded good.</p>
            <p>When I looked for the pattern, I saw it. More than once, I recognized ability in people and encouraged them to start businesses of their own; several now lead successful companies. That is the hope-giving part: helping someone see what God may be forming in them before they fully see it themselves.</p>
            <p>Builder comes from the life I have spent creating companies, teams, systems, and opportunities. Christ is the source of the identity. Serving people is how I try to live it.</p>
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
            <h2>The people I serve first are at home.</h2>
            <p>Faith, family, and community give the rest of the work its meaning. Outside the office, I enjoy the things that make me stretch, pay attention, and keep learning—rock climbing, hiking, West Coast Swing, bowling, strength training, and playing guitar.</p>
            <div className="interest-list"><span>Rock climbing</span><span>Hiking</span><span>West Coast Swing</span><span>Bowling</span><span>Strength Training</span><span>Playing Guitar</span></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-shell contact-layout">
          <div className="contact-intro" data-reveal>
            <p className="section-label">Let&apos;s connect</p>
            <h2>Tell me what you&apos;re building—or what you believe could be.</h2>
            <p>I enjoy meeting people who care deeply about their work, their community, or an idea they cannot shake. Share a little context and I&apos;ll read it personally.</p>
          </div>
          <form className="contact-form" action="https://formspree.io/f/xppzzbog" method="POST" onSubmit={handleContactSubmit} data-formspree-connected="true" data-reveal>
            <input type="hidden" name="_subject" value="New message from KyleHearn.com" />
            <label><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="How should I address you?" /></label>
            <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            <label><span>What are you building, solving, or considering?</span><textarea name="message" rows={5} required placeholder="A little context is plenty." /></label>
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
