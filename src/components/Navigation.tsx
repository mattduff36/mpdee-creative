'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

declare global {
  interface Window {
    trackConversion?: (action: string) => void;
    trackHubReferral?: () => void;
  }
}

const navigation = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Clients', href: '/#clients' },
  { label: 'Contact', href: '/#contact' },
];

function Arrow() {
  return (
    <svg
      className="arrow-icon"
      width="18"
      height="18"
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

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="MPDEE Creative home"
          onClick={() => setOpen(false)}
        >
          <Image
            className="brand-mark"
            src="/images/MPDEE-Creative-logo.png"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span className="brand-name">
            <span>
              mpdee<span className="brand-stop">.</span>
            </span>
            <span className="brand-sub">CREATIVE</span>
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(value => !value)}
        >
          {open ? 'Close' : 'Menu'}
          <span className={open ? 'menu-lines is-open' : 'menu-lines'} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? 'main-nav is-open' : 'main-nav'}
        >
          {navigation.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            className="header-cta"
            href="/#contact"
            onClick={() => {
              setOpen(false);
              window.trackConversion?.('contact_nav');
            }}
          >
            Let’s talk <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
