import type { Metadata } from 'next';
import Link from 'next/link';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'MPDEE Creative — Good ideas. Unmistakable sound.',
  description:
    'Professional audio production services specializing in radio commercial production, audio imaging, and event recording.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MPDEE Creative — Good ideas. Unmistakable sound.',
    description:
      'Professional audio production services specializing in radio commercial production, audio imaging, and event recording.',
    type: 'website',
    url: 'https://creative.mpdee.co.uk',
    siteName: 'MPDEE Creative',
    locale: 'en_GB',
  },
};

const CLIENT_MAIL =
  'mailto:creative@mpdee.co.uk?subject=Client%20file%20or%20access%20request';

const services = [
  {
    number: '01',
    title: 'Radio Commercial Production',
    description:
      'Radio commercials taken through scriptwriting, voice talent, sound and full production.',
    tags: ['Scriptwriting', 'Voice talent', 'Sound', 'Full production'],
  },
  {
    number: '02',
    title: 'Audio Imaging',
    description:
      'Station imaging: IDs, jingles, sweepers and promos.',
    tags: ['IDs', 'Jingles', 'Sweepers', 'Promos'],
  },
  {
    number: '03',
    title: 'Event Recording',
    description:
      'Live recording, multitrack capture, post-production and delivery.',
    tags: ['Live', 'Multitrack', 'Post', 'Delivery'],
  },
];

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Audio production
          </div>
          <h1 id="hero-title">
            Good ideas.
            <br />
            Unmistakable
            <br />
            <span className="marker-word">
              sound.
              <svg viewBox="0 0 340 24" aria-hidden="true">
                <path
                  d="M5 16Q120 1 332 10M12 21Q150 12 312 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-description">
            Radio commercial production, audio imaging and event recording.
            Script, voice, sound and a finished mix.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/#contact">
              Send a brief <Arrow />
            </Link>
            <Link className="text-link" href="/#services">
              The services <Arrow diagonal={false} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="tiny-cross">+</span>
            creative@mpdee.co.uk
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Studio graphic with a vinyl disc, tape reels, a waveform and track labels"
        >
          <div className="art-grid" />
          <div className="vinyl" aria-hidden="true">
            <div className="vinyl-label">
              MPDEE
              <small>CREATIVE</small>
              <span className="vinyl-hole" />
            </div>
          </div>
          <div className="reel-arm" aria-hidden="true">
            <span className="reel" />
            <span className="reel" />
          </div>
          <div className="desk-card">
            <div className="desk-bar">
              <span />
              <span />
              <span />
              <small>SESSION</small>
            </div>
            <svg className="waveform" viewBox="0 0 360 70" aria-hidden="true">
              {Array.from({ length: 48 }, (_, index) => {
                const height = 12 + ((index * 17) % 46);
                const accent = index % 7 === 0 || index % 5 === 0;
                return (
                  <rect
                    key={index}
                    className={accent ? 'wave-accent' : undefined}
                    x={8 + index * 7.3}
                    y={62 - height}
                    width="3.2"
                    height={height}
                    rx="1.2"
                    fill="currentColor"
                  />
                );
              })}
            </svg>
            <ul className="track-list">
              <li>
                <span>01</span> Voice
              </li>
              <li>
                <span>02</span> Music bed
              </li>
              <li>
                <span>03</span> Mix
              </li>
            </ul>
          </div>
          <span className="art-coordinate" aria-hidden="true">
            WAVEFORM / VINYL
          </span>
        </div>
      </section>

      <section
        id="services"
        className="capabilities-section"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <SectionLabel number="01">Services</SectionLabel>
          <div className="section-heading">
            <h2 id="services-heading">
              Three ways
              <br />
              <span className="muted-light">to make the sound.</span>
            </h2>
            <p>
              Radio commercials, station imaging, and recording for live
              events. Choose the job you need, then send a brief.
            </p>
          </div>
          <div className="capability-list">
            {services.map(service => (
              <Link className="capability-row" href="/#contact" key={service.number}>
                <span className="capability-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-list">
                    {service.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="capability-arrow">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="section container process-section"
        aria-labelledby="process-heading"
      >
        <SectionLabel number="02">Process</SectionLabel>
        <div className="section-heading">
          <h2 id="process-heading">
            Brief, production,
            <br />
            <span className="muted">then the files.</span>
          </h2>
          <p>A short path from the job you describe to the audio you receive.</p>
        </div>
        <ol className="process-grid">
          <li>
            <span>01</span>
            <h3>Brief</h3>
            <p>
              Send the commercial, imaging or event you need recorded, and any
              script or reference you already have.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Production</h3>
            <p>
              Scriptwriting, voice, sound and mix for commercials and imaging.
              Live capture, multitrack and post for events.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Delivery</h3>
            <p>Finished audio, sent to you. Ask by email if you need the files again.</p>
          </li>
        </ol>
      </section>

      <section id="clients" className="section container" aria-labelledby="clients-heading">
        <span id="client-login" />
        <SectionLabel number="03">Clients</SectionLabel>
        <div className="section-heading">
          <h2 id="clients-heading">
            Already working
            <br />
            <span className="muted">together?</span>
          </h2>
        </div>
        <div className="clients-panel">
          <div>
            <p>Email creative@mpdee.co.uk for project files.</p>
            <a className="button button-dark" href={CLIENT_MAIL}>
              Email for project files <Arrow />
            </a>
          </div>
          <aside className="clients-aside">
            <span className="eyebrow">Looking for your audio?</span>
            <p>Include the project name and the files you need.</p>
          </aside>
        </div>
      </section>

      <section id="contact" className="contact-cta" aria-labelledby="contact-heading">
        <div className="container cta-inner">
          <div className="contact-copy">
            <span className="eyebrow">Contact</span>
            <h2 id="contact-heading">
              Send the brief
              <br />
              <span>for new work.</span>
            </h2>
            <p>
              Radio commercials, station imaging or an event to record. Tell us
              what you need and we will reply by email.
            </p>
          </div>
          <Contact />
        </div>
      </section>
    </>
  );
}
