import Link from 'next/link';

const sections = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#clients', label: 'Clients' },
  { href: '/#contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <section className="container page-intro not-found">
      <span className="eyebrow">404 / Page not found</span>
      <h1>
        This page
        <br />
        was not <span className="serif-word">found.</span>
      </h1>
      <p>
        The link may have changed, or the page may no longer exist. The
        homepage has the audio services, process, client access and contact
        email.
      </p>
      <nav className="not-found-links" aria-label="Homepage sections">
        {sections.map(section => (
          <Link key={section.href} className="text-link" href={section.href}>
            {section.label}
          </Link>
        ))}
      </nav>
      <Link href="/" className="button button-dark">
        Back to the homepage
      </Link>
    </section>
  );
}
