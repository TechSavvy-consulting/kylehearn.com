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
    eyebrow: 'The first build',
    title: 'Mentor Technologies at 17',
    body: 'I started an IT company in Tulsa while I was still a teenager. The technology mattered, but the real education was learning how much trust, responsiveness, and clear ownership matter to a business.',
  },
  {
    year: 'GROWTH',
    eyebrow: 'Learning to lead',
    title: 'Companies, teams, and an exit',
    body: 'I built and acquired IT and telecommunications companies, supported hundreds of businesses, and grew Mentor Technologies and Reflection Backup Solutions to a combined 17 employees before that chapter was sold.',
  },
  {
    year: '2015',
    eyebrow: 'Back to the work',
    title: 'TechSavvy Consulting',
    body: 'I founded TechSavvy to stay close to business owners and the problems they live with every day—making IT simpler, safer, and genuinely useful without adding more noise.',
  },
  {
    year: 'NOW',
    eyebrow: 'The next toolset',
    title: 'Practical AI and useful systems',
    body: 'Today I am exploring what you can build with AI, while keeping the standard the same: solve a real problem, make the value clear, and leave the person stronger.',
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
          <a href="#building">Building</a>
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
            <a href="#building" onClick={() => setMobileMenuOpen(false)}>What I&apos;m building</a>
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
          <p className="eyebrow"><span>People</span><i /><span>Ideas</span><i /><span>Technology</span></p>
          <h1 id="hero-title">Technology should make life <em>clearer.</em></h1>
          <p className="hero-lede">Hi, I&apos;m Kyle Hearn—a Tulsa entrepreneur, trusted advisor, and <strong>Hope-Giving Builder</strong>. I&apos;ve been building in technology since 1998, with experience founding, acquiring, growing, and selling businesses. Today I stay close to the work through TechSavvy Consulting and my exploration of practical AI, helping people turn complicated problems into clear, useful next steps. Tulsa is home, and I&apos;m deeply invested in its people and business community.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#building">See what I&apos;m building <span>↘</span></a>
            <a className="button button-quiet" href="#journey">Follow the journey <span>↓</span></a>
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
            <p><strong>Hope-Giving Builder</strong><small>An identity from Christ. A calling to build with clarity and hope.</small></p>
          </div>
        </div>

      </section>

      <section className="throughline section-dark">
        <div className="section-shell throughline-grid" data-reveal>
          <p className="section-label">The Common Thread</p>
          <div>
            <h2>Builder at heart.<br />Technologist by experience.<br /><em>Owner in how I think.</em></h2>
            <p>I am drawn to the problems people quietly live around: the unreliable system, the confusing vendor, the useful idea that never became a plan. My best work begins with listening, gets practical quickly, and ends with someone better equipped to move forward.</p>
          </div>
        </div>

        <div className="section-shell pillars" data-reveal>
          <article><span>PEOPLE</span><h3>See the person</h3><p>Listen well. Tell the truth. Bring calm to the room and leave people with more clarity and confidence.</p></article>
          <article><span>IDEAS</span><h3>Find the useful answer</h3><p>Connect the business need to the right next step—without letting novelty or complexity become the point.</p></article>
          <article><span>TECHNOLOGY</span><h3>Build what helps</h3><p>Use IT, operations, and practical AI to remove friction and create systems people can actually rely on.</p></article>
        </div>
      </section>

      <section className="building section-building" id="building">
        <div className="section-shell">
          <div className="section-heading section-heading--split" data-reveal>
            <div><p className="section-label">What I&apos;m building now</p><h2>Useful work in a few different forms.</h2></div>
            <p>I like staying close enough to the work to understand what is real—and curious enough to keep trying better ways to solve it.</p>
          </div>

          <div className="venture-grid">
            <a className="venture-card venture-card--featured" href="https://www.techsavvy.consulting/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">OWNER · ADVISOR · OPERATOR</span>
              <div><h3>TechSavvy<br />Consulting</h3></div>
              <p>Helping Tulsa businesses make IT simpler, safer, and more useful through responsive support, cybersecurity, Microsoft 365, and clear guidance.</p>
              <b>Visit TechSavvy <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ai" href="https://www.youtube.com/@YouCanMakeItWithAI" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">CREATOR · EXPLORER</span>
              <div><h3>You Can Make It<br />With AI</h3></div>
              <p>Showing business owners and everyday people how plain English and modern AI tools can turn useful ideas into working applications.</p>
              <b>Explore the channel <span>↗</span></b>
            </a>

            <a className="venture-card venture-card--ideas" href="https://www.linkedin.com/in/kylehearn/" target="_blank" rel="noreferrer" data-reveal>
              <span className="venture-type">BUILDING · TESTING · SHARING</span>
              <div><h3>Ideas turned into<br />useful systems</h3></div>
              <p>I share what I am learning from building and operating real businesses—practical lessons about technology, AI, leadership, and the systems that help people do better work.</p>
              <b>Follow the work on LinkedIn <span>↗</span></b>
            </a>
          </div>

          <div className="credentials-panel" data-reveal>
            <div className="credentials-intro">
              <p className="section-label">Certified expertise</p>
              <h3>Continued learning, grounded in real work.</h3>
              <p>Formal training strengthens the judgment earned through decades of ownership and hands-on delivery.</p>
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
              <h2 id="wired-title">Big-picture thinking.<br /><em>Patient listening.</em><br />Practical next steps.</h2>
              <p>I see the big picture quickly, but my best work begins with listening. I value candid conversation, clear ownership, and turning vision into practical next steps that leave people with greater clarity and hope.</p>
            </div>
          </div>

          <div className="wired-grid">
            <article data-reveal>
              <h3>See the pattern</h3>
              <p>I naturally connect people, ideas, and systems—then ask why until the real opportunity becomes clearer.</p>
            </article>
            <article data-reveal>
              <h3>Listen before leading</h3>
              <p>People matter before problems. I try to understand what someone is experiencing before recommending what comes next.</p>
            </article>
            <article data-reveal>
              <h3>Make it practical</h3>
              <p>A good idea should become a clear decision, an accountable owner, and a useful next step.</p>
            </article>
            <article data-reveal>
              <h3>Build with purpose</h3>
              <p>I am motivated by truth, learning, cooperation, and work that leaves people better equipped than before.</p>
            </article>
          </div>

          <p className="wired-note" data-reveal>Personality assessments might call this a mix of Commander and Coach. I think of it more simply: <strong>clarity with care.</strong></p>
        </div>
      </section>

      <section className="journey section-journey" id="journey">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <p className="section-label">My journey</p>
            <h2>Nearly three decades of building, learning, and returning to what matters.</h2>
            <p>The companies and tools have changed. The work underneath them has stayed remarkably consistent.</p>
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
            <h2>What I build is practical.<br /><em>Why I build is personal.</em></h2>
          </div>
          <div className="identity-copy" data-reveal>
            <p className="identity-lede"><strong>Christ is the source of the identity I call Hope-Giving Builder.</strong> Through Jamie and Donna Winship&apos;s teaching on true identity, I learned to ask who God says I am—and to work from that answer rather than from fear, pressure, or performance.</p>
            <p>That faith shapes how I try to lead, solve problems, and serve: see the person before the task, be honest about what is true, take responsibility, and build toward greater clarity and hope.</p>
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
            <h2>Faith and family keep the rest in perspective.</h2>
            <p>I enjoy the things that make me stretch, pay attention, and keep learning—rock climbing, hiking, West Coast Swing, bowling, strength training, and playing guitar. Each has its own way of rewarding curiosity, patience, and steady improvement.</p>
            <div className="interest-list"><span>Rock climbing</span><span>Hiking</span><span>West Coast Swing</span><span>Bowling</span><span>Strength Training</span><span>Playing Guitar</span></div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-shell contact-layout">
          <div className="contact-intro" data-reveal>
            <p className="section-label">Let&apos;s connect</p>
            <h2>Have a problem or a useful idea?</h2>
            <p>Tell me what you are working through. I&apos;ll read it personally and follow up when a conversation makes sense.</p>
          </div>
          <form className="contact-form" action="https://formspree.io/f/xppzzbog" method="POST" onSubmit={handleContactSubmit} data-formspree-connected="true" data-reveal>
            <input type="hidden" name="_subject" value="New message from KyleHearn.com" />
            <label><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="How should I address you?" /></label>
            <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            <label><span>What can I help you build or solve?</span><textarea name="message" rows={5} required placeholder="A little context is plenty." /></label>
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
