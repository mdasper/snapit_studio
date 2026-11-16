import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitReveal from '../ui/SplitReveal';
import Magnetic from '../ui/Magnetic';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const ringRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const [headlineReady, setHeadlineReady] = useState(true);
  const prefersReduced = useReducedMotion();

  const icon1Ref = useMouseParallax({ strength: 30, duration: 0.8 });
  const icon2Ref = useMouseParallax({ strength: -20, duration: 1.0 });

  useEffect(() => {
    // Determine if we should animate immediately
    const alreadyPlayed =
      sessionStorage.getItem('preloader_done') === '1' ||
      sessionStorage.getItem('preloader:done') === '1';

    if (alreadyPlayed || prefersReduced) {
      setHeadlineReady(true);
      return;
    }

    const onPreloaderDone = () => {
      setHeadlineReady(true);
    };

    window.addEventListener('preloader:done', onPreloaderDone);
    const fallbackTimer = setTimeout(() => {
      setHeadlineReady(true);
    }, 2500);

    return () => {
      window.removeEventListener('preloader:done', onPreloaderDone);
      clearTimeout(fallbackTimer);
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Rotating ring
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      // Hero parallax / fade on scroll
      const section = sectionRef.current;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (!bgRef.current) return;
          const progress = self.progress;
          gsap.set(bgRef.current, { scale: 1 + progress * 0.15 });
          gsap.set(section, { opacity: 1 - progress * 0.4 });
        },
      });

      // Headline parallax
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (!headlineRef.current) return;
          gsap.set(headlineRef.current, { y: -self.progress * 80 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Sub + CTA fade in after headline
  useEffect(() => {
    if (!headlineReady || prefersReduced) return;
    gsap.fromTo(
      [subRef.current, ctaRef.current],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.9 }
    );
  }, [headlineReady, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--deep)',
      }}
    >
      {/* Background video / gradient */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #10282c 0%, #1b4348 50%, #6b9599 100%)',
          transformOrigin: 'center',
        }}
      >
        <video
          src="/showreel.mp4"
          muted
          autoPlay
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0.6,
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Dark radial overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(16,40,44,0.85) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />



      {/* Rotating ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          border: '1.5px solid rgba(242,211,79,0.3)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Floating icons */}
      <span
        ref={icon1Ref}
        style={{
          position: 'absolute',
          top: '20%',
          left: '12%',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          opacity: 0.4,
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        🎬
      </span>
      <span
        ref={icon2Ref}
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '10%',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          opacity: 0.35,
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        📷
      </span>

      {/* Content */}
      <div
        ref={headlineRef}
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '900px',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            className="hero-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.1rem, 7.5vw, 6.5rem)',
              lineHeight: 1.05,
              color: 'var(--cloud)',
              margin: 0,
            }}
          >
            We Frame <span style={{ color: 'var(--yellow)' }}>Every Story</span>
          </h1>
          <h1
            className="hero-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.1rem, 7.5vw, 6.5rem)',
              lineHeight: 1.05,
              color: 'var(--cloud)',
              margin: '0.2rem 0 0',
            }}
          >
            Worth Telling.
          </h1>
        </div>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            color: 'var(--cloud)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
            opacity: 1,
            fontWeight: 600,
          }}
        >
          Ads Shoot · Reels Production · Short Films · Video Editing — <span style={{ color: 'var(--yellow)' }}>Natham</span>
        </p>

        <div ref={ctaRef} style={{ opacity: 1 }}>
          <Magnetic strength={0.4}>
            <button
              onClick={() => navigate('/work')}
              data-cursor="link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2.4rem',
                background: 'transparent',
                border: '1.5px solid var(--yellow)',
                borderRadius: '100px',
                color: 'var(--yellow)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--yellow)';
                e.currentTarget.style.color = 'var(--deep)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--yellow)';
              }}
            >
              View Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(238,240,238,0.4)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(242,211,79,0.6), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.7); }
        }
        @media (max-width: 768px) {
          #hero .hero-line { font-size: clamp(2.5rem, 10vw, 4rem) !important; }
        }
      `}</style>
    </section>
  );
}

