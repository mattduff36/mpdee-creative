'use client';

import Link from 'next/link';

function Arrow() {
  return (
    <svg
      className="arrow-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" className="footer-brand">
              mpdee<span>.</span>
            </Link>
            <p>
              Radio commercials, audio imaging
              <br />
              and event recording.
            </p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">On this site</span>
            <Link href="/#services">Services</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#clients">Clients</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div className="footer-links">
            <span className="eyebrow">Email</span>
            <a href="mailto:creative@mpdee.co.uk">
              creative@mpdee.co.uk <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MPDEE Creative</span>
          <div>
            <span>MPDEE group</span>
            <a
              href="https://mpdee.co.uk"
              onClick={() => window.trackHubReferral?.()}
            >
              mpdee.co.uk <Arrow />
            </a>
            <a href="https://development.mpdee.co.uk">
              Development <Arrow />
            </a>
            <a href="https://support.mpdee.co.uk">
              Support <Arrow />
            </a>
          </div>
          <a href="#main-content">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
