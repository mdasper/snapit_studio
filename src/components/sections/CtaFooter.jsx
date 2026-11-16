import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';
import { siteConfig } from '../../data/siteConfig';
import logoUrl from '../../assets/logo.png';

export default function CtaFooter({
  showCta = true,
  eyebrow = 'Ready to Direct Your Story?',
  titlePrefix = "Let's make something",
  titleHighlight = 'remarkable.',
  subtext = 'From high-concept commercial ads and viral reels to cinematic short films — our Natham studio turns ambitious ideas into cinema.',
  buttonText = 'Start A Project',
  buttonIcon = '🎬',
  buttonLink = '/contact',
  auraColor = 'rgba(242,211,79,0.12)',
}) {
  const [clapping, setClapping] = useState(false);

  const handleClap = () => {
    setClapping(true);
    setTimeout(() => setClapping(false), 600);
  };

  return (
    <footer
      style={{
        position: 'relative',
        minHeight: showCta ? '100vh' : 'auto',
        width: '100%',
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid rgba(107, 149, 153, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        .footer-columns-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.9fr 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          margin-bottom: 3.5rem;
          box-sizing: border-box;
        }
        @media (max-width: 1080px) {
          .footer-columns-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .footer-columns-grid {
            grid-template-columns: 1fr;
            gap: 2.2rem;
          }
        }
      `}</style>

      {/* ── 1. Top Cinematic Film Perforation Strip ───────────────────────── */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 2vw',
          borderBottom: '1px solid rgba(107, 149, 153, 0.15)',
          background: 'rgba(16, 40, 44, 0.6)',
          overflow: 'hidden',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: 10,
              borderRadius: 2,
              border: '1px solid rgba(242, 211, 79, 0.35)',
              background: 'rgba(242, 211, 79, 0.08)',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* ── 2. Unique Page-Specific CTA Billboard ─────────────────────────── */}
      {showCta && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
            width: '100%',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* Custom Page Glow Backdrop */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              height: '520px',
              borderRadius: '50%',
              background: `radial-gradient(ellipse at center, ${auraColor} 0%, rgba(107,149,153,0.05) 50%, transparent 75%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.4rem',
              borderRadius: '100px',
              background: 'rgba(242,211,79,0.08)',
              border: '1px solid rgba(242,211,79,0.3)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Unique Hero Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
              color: 'var(--cloud)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              width: '100%',
            }}
          >
            {titlePrefix}{' '}
            <span
              style={{
                color: 'var(--yellow)',
                textShadow: '0 0 40px rgba(242,211,79,0.4)',
                display: 'inline-block',
              }}
            >
              {titleHighlight}
            </span>
          </h2>

          {/* Page Narrative Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
              color: 'var(--teal)',
              maxWidth: '1000px',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            {subtext}
          </p>

          {/* Luxury Magnetic Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Magnetic strength={0.35}>
              <Link
                to={buttonLink}
                onClick={handleClap}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: 'clamp(0.9rem, 2.5vw, 1.3rem) clamp(1.8rem, 5vw, 3.5rem)',
                  borderRadius: '100px',
                  background: 'var(--yellow)',
                  color: 'var(--deep)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(0.925rem, 2vw, 1.1rem)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 12px 40px rgba(242,211,79,0.4), 0 0 0 1px rgba(255,255,255,0.2)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(242,211,79,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(242,211,79,0.4)';
                }}
              >
                <span>{buttonIcon}</span>
                <span>{buttonText}</span>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: 'var(--deep)',
                    color: 'var(--yellow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    marginLeft: '0.25rem',
                  }}
                >
                  →
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      )}

      {/* ── 3. Bottom Studio Directory Footer Block (FULL VIEWPORT WIDTH) ─── */}
      <div
        style={{
          borderTop: '1px solid rgba(107, 149, 153, 0.2)',
          background: 'rgba(16, 40, 44, 0.75)',
          padding: 'clamp(3.5rem, 6vw, 5rem) clamp(2rem, 5vw, 6rem) 2.5rem',
          width: '100%',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      >
        <div className="footer-columns-grid">
          {/* Col 1: Studio Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(27,67,72,0.6)',
                  border: '1.5px solid rgba(242,211,79,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                <img src={logoUrl} alt="Snapit Studioz" style={{ width: 36, height: 36, objectFit: 'contain' }} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--yellow)', letterSpacing: '0.06em', display: 'block', lineHeight: 1 }}>
                  SNAPIT
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--cloud)', letterSpacing: '0.12em', display: 'block', lineHeight: 1, marginTop: '4px' }}>
                  STUDIOZ
                </span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--teal)', marginBottom: '1.25rem' }}>
              Full-spectrum production house delivering high-end Ads Shoot, Viral Reels Production, Narrative Short Films Making, and Professional Video Editing.
            </p>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--yellow)', fontWeight: 700 }}>
              Natham, Tamil Nadu • Global Masters
            </span>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { label: 'Selected Works', to: '/work' },
                { label: 'Capabilities & Gear', to: '/services' },
                { label: 'The Studio / Crew', to: '/about' },
                { label: 'Commission A Film', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--cloud)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      opacity: 0.85,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--yellow)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cloud)'; e.currentTarget.style.opacity = '0.85'; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Line */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              Direct Line
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
              <a
                href={`mailto:${siteConfig.email}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--cloud)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  opacity: 0.85,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cloud)'}
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--cloud)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  opacity: 0.85,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cloud)'}
              >
                {siteConfig.phone}
              </a>
            </div>

            {/* WhatsApp Pill */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20SNAPIT%20STUDIOZ,%20I'd%20like%20to%20discuss%20a%20project`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '100px',
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.45)',
                color: '#25D366',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.22)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)'}
            >
              <span>💬</span>
              <span>Chat on WhatsApp ↗</span>
            </a>
          </div>

          {/* Col 4: Channels & Socials */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--yellow)',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              Connect & Feeds
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { label: 'Instagram Profile ↗', href: siteConfig.instagram },
                { label: 'YouTube 4K Channel ↗', href: 'https://youtube.com' },
                { label: 'Vimeo Pro Masters ↗', href: 'https://vimeo.com' },
                { label: '2024 Studio Showreel ↗', href: '#showreel' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--cloud)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      opacity: 0.85,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--yellow)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cloud)'; e.currentTarget.style.opacity = '0.85'; }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 4. Copyright & Credits Bar ───────────────────────────────── */}
        <div
          style={{
            width: '100%',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(107, 149, 153, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--teal)',
            opacity: 0.9,
          }}
        >
          <div>
            © {new Date().getFullYear()} SNAPIT STUDIOZ. All motion, sound & visual rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', letterSpacing: '0.08em' }}>
            <span>Natham, Tamil Nadu // Global Masters</span>
            <span style={{ color: 'var(--yellow)' }}>•</span>
            <span>Crafted with Motion & Optical Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
