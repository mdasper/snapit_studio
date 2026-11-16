import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Magnetic from '../ui/Magnetic';
import logoUrl from '../../assets/logo.png';

const NAV_LINKS = [
  { label: 'Work', to: '/work', index: '01' },
  { label: 'Services', to: '/services', index: '02' },
  { label: 'About', to: '/about', index: '03' },
  { label: 'Contact', to: '/contact', index: '04' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayLinksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      if (y > lastY.current && y > 150) {
        gsap.to(nav, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
      } else if (y < lastY.current) {
        gsap.to(nav, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const hamburger = hamburgerRef.current;
    if (!overlay) return;

    if (menuOpen) {
      const rect = hamburger?.getBoundingClientRect();
      const cx = rect ? `${rect.left + rect.width / 2}px` : '95%';
      const cy = rect ? `${rect.top + rect.height / 2}px` : '32px';

      gsap.set(overlay, { display: 'flex', clipPath: `circle(0% at ${cx} ${cy})` });
      gsap.to(overlay, { clipPath: `circle(150% at ${cx} ${cy})`, duration: 0.7, ease: 'power4.inOut' });
      gsap.fromTo(
        overlayLinksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.3 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      const rect = hamburger?.getBoundingClientRect();
      const cx = rect ? `${rect.left + rect.width / 2}px` : '95%';
      const cy = rect ? `${rect.top + rect.height / 2}px` : '32px';

      gsap.to(overlay, {
        clipPath: `circle(0% at ${cx} ${cy})`,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(16, 40, 44, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(107, 149, 153, 0.2)' : '1px solid transparent',
          transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            boxSizing: 'border-box',
          }}
        >
          {/* Logo brand block */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              textDecoration: 'none',
            }}
          >
            {/* Circular badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(27, 67, 72, 0.5)',
                border: '1.5px solid rgba(242, 211, 79, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(242, 211, 79, 0.15)',
                flexShrink: 0,
              }}
            >
              <img
                src={logoUrl}
                alt="Snapit Studioz"
                style={{
                  width: 34,
                  height: 34,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    color: 'var(--yellow)',
                    letterSpacing: '0.06em',
                  }}
                >
                  SNAPIT
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--cloud)',
                    letterSpacing: '0.12em',
                  }}
                >
                  STUDIOZ
                </span>
              </div>
              <span
                className="brand-subtitle"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: 'var(--yellow)',
                  letterSpacing: '0.18em',
                  marginTop: '0.25rem',
                  opacity: 0.95,
                  textTransform: 'uppercase',
                }}
              >
                ADS • REELS • SHORT FILMS • NATHAM
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul
            role="list"
            className="desktop-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Magnetic strength={0.3}>
                  <NavLink
                    to={link.to}
                    style={({ isActive }) => ({
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1.15rem',
                      borderRadius: '100px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.825rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      backgroundColor: isActive ? 'var(--yellow)' : 'rgba(27, 67, 72, 0.45)',
                      color: isActive ? 'var(--deep)' : 'var(--cloud)',
                      border: isActive
                        ? '1px solid var(--yellow)'
                        : '1px solid rgba(107, 149, 153, 0.25)',
                      boxShadow: isActive ? '0 4px 16px rgba(242, 211, 79, 0.35)' : 'none',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.25s ease',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          style={{
                            fontSize: '0.62rem',
                            color: isActive ? 'var(--deep)' : 'var(--teal)',
                            fontWeight: 700,
                            opacity: isActive ? 0.8 : 0.7,
                          }}
                        >
                          {link.index}
                        </span>
                        <span>{link.label}</span>
                      </>
                    )}
                  </NavLink>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Hamburger button for mobile */}
          <button
            ref={hamburgerRef}
            className="mobile-hamburger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 301,
            }}
          >
            <span
              style={{
                width: 26,
                height: 2,
                backgroundColor: 'var(--cloud)',
                display: 'block',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                width: 26,
                height: 2,
                backgroundColor: 'var(--cloud)',
                display: 'block',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          background: 'var(--mid)',
          zIndex: 300,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
        }}
      >
        <ul
          role="list"
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            padding: 0,
            margin: 0,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <li key={link.to} ref={(el) => (overlayLinksRef.current[i] = el)}>
              <NavLink
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  fontWeight: 800,
                  color: isActive ? 'var(--yellow)' : 'var(--cloud)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                })}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--teal)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {link.index}
                </span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--teal)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          We Frame Your Story
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .mobile-hamburger-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .brand-subtitle {
            font-size: 0.46rem !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
    </>
  );
}
