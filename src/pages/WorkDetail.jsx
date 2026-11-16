import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { useTransition } from '../components/transitions/TransitionContext';
import { useCursor } from '../components/cursor/Cursor';
import CtaFooter from '../components/sections/CtaFooter';

export default function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setClickPos, setDestTitle } = useTransition();
  const { setCursorState } = useCursor();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const project = projects.find((p) => p.id === slug) || projects[0];
  const nextProject = projects.find((p) => p.id === project.nextProject) || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleNextProjectClick = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setDestTitle(nextProject.title);
    navigate(`/work/${nextProject.id}`);
  };

  const s = {
    wrap: {
      minHeight: '100vh',
      paddingTop: '8rem',
      paddingBottom: '4rem',
      backgroundColor: 'var(--deep)',
      width: '100%',
      boxSizing: 'border-box',
    },
    inner: {
      width: '100%',
      padding: '0 clamp(1.5rem, 5vw, 6rem)',
      boxSizing: 'border-box',
    },
  };

  const heroMedia = project.thumbnail || project.image || '/media/project_1.jpg';

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--deep)' }}>
      <main id="main-content" style={s.wrap}>
        {/* Back */}
        <div style={{ ...s.inner, marginBottom: '2rem' }}>
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--yellow)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--teal)'}
          >
            ← Back to All Projects
          </Link>
        </div>

        {/* Header - FULL WIDTH */}
        <div style={{ ...s.inner, marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                padding: '0.35rem 1rem',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(242,211,79,0.1)',
                border: '1px solid rgba(242,211,79,0.4)',
                color: 'var(--yellow)',
                fontWeight: 700,
              }}
            >
              {project.category}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 600 }}>
              Client: {project.client} // {project.year}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--cloud)',
              marginBottom: '1.5rem',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              maxWidth: '54rem',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              lineHeight: 1.75,
              color: 'var(--teal)',
              opacity: 0.9,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Hero Banner - FULL WIDTH */}
        <div style={{ ...s.inner, marginBottom: '5rem' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21/9',
              minHeight: '380px',
              borderRadius: 'clamp(1rem, 2vw, 1.75rem)',
              overflow: 'hidden',
              border: '1px solid rgba(107,149,153,0.3)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              backgroundColor: '#0c1e21',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Real cinema background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${heroMedia})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16,40,44,0.85) 0%, rgba(16,40,44,0.3) 50%, rgba(16,40,44,0.6) 100%)',
              }}
            />

            {/* Play button */}
            <button
              onClick={() => setIsPlaying(true)}
              style={{
                position: 'relative',
                zIndex: 2,
                width: 'clamp(5rem, 8vw, 7rem)',
                height: 'clamp(5rem, 8vw, 7rem)',
                borderRadius: '50%',
                border: '1.5px solid rgba(242,211,79,0.7)',
                backgroundColor: 'rgba(16,40,44,0.85)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--yellow)',
                fontSize: '2rem',
                cursor: 'pointer',
                transition: 'transform 0.4s ease, background 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(242,211,79,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
              }}
            >
              <span style={{ marginLeft: 4 }}>▶</span>
            </button>

            {/* Badge */}
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(238,240,238,0.95)',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '100px',
                  fontWeight: 600,
                }}
              >
                4K DCI THEATRICAL MASTER
              </span>
            </div>
          </div>
        </div>

        {/* Video Modal if playing */}
        {isPlaying && (
          <div
            onClick={() => setIsPlaying(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(94vw, 1100px)',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 30px 90px rgba(0,0,0,0.9)',
                border: '1px solid rgba(242,211,79,0.3)',
              }}
            >
              <button
                onClick={() => setIsPlaying(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(16,40,44,0.85)',
                  border: '1px solid var(--yellow)',
                  color: 'var(--yellow)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${heroMedia})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎬</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cloud)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--yellow)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                    THEATRICAL CUT • 4K 60FPS ACES COLOR
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story & Technical Specs Grid - FULL WIDTH */}
        <div style={{ ...s.inner, marginBottom: '6rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 6rem)',
            }}
          >
            {/* Story */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                  display: 'block',
                  marginBottom: '0.8rem',
                  fontWeight: 700,
                }}
              >
                Creative Direction & Treatment
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: 'var(--cloud)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                Capturing The Authentic Pulse
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--teal)', marginBottom: '1.5rem' }}>
                Every element of this production was engineered to evoke immediate emotional resonance. From the initial colour palette mapping to custom anamorphic distortion calibration, no detail was left unexamined.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--teal)' }}>
                Our team handled complete production from initial storyboard drafts through on-set direction, anamorphic lens shooting, and multi-layered sound design in post-production.
              </p>

              {/* Frame plates with real photos */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem',
                  marginTop: '2.5rem',
                }}
              >
                {[
                  { label: 'FRAME // 01', desc: 'Cinematic on-location optical rig study.', img: '/media/camera_rig.jpg' },
                  { label: 'FRAME // 02', desc: 'ACES DaVinci Resolve color space master grading.', img: '/media/color_grading.jpg' },
                ].map((f, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      border: '1px solid rgba(107,149,153,0.25)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      backgroundColor: '#0c1e21',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${f.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.5,
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,40,44,0.95) 0%, transparent 60%)' }} />
                    <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.18em', color: 'var(--yellow)', fontWeight: 700 }}>
                      {f.label}
                    </span>
                    <p style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--cloud)', margin: 0, lineHeight: 1.5 }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div
              style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(107,149,153,0.22)',
                backgroundColor: 'var(--mid)',
                alignSelf: 'start',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                  marginBottom: '1.5rem',
                  fontWeight: 700,
                }}
              >
                Services Delivered
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '2.5rem' }}>
                {project.services.map((svc) => (
                  <li
                    key={svc}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 0',
                      borderBottom: '1px solid rgba(107,149,153,0.15)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.925rem',
                      color: 'var(--cloud)',
                    }}
                  >
                    <span style={{ color: 'var(--yellow)', fontSize: '0.85rem' }}>✔</span>
                    {svc}
                  </li>
                ))}
              </ul>

              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--yellow)',
                  marginBottom: '1rem',
                  fontWeight: 700,
                }}
              >
                Tags & Archetypes
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      padding: '0.35rem 0.8rem',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(16,40,44,0.7)',
                      border: '1px solid rgba(107,149,153,0.3)',
                      color: 'var(--teal)',
                      fontWeight: 600,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Project - FULL WIDTH */}
        <div
          style={{
            borderTop: '1px solid rgba(107,149,153,0.2)',
            paddingTop: '4rem',
            marginBottom: '4rem',
          }}
        >
          <div style={s.inner}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: '1rem',
                fontWeight: 700,
              }}
            >
              Next In Sequence //
            </p>
            <div
              onClick={handleNextProjectClick}
              onMouseEnter={() => {
                setCursorState('link');
                setHoverNext(true);
              }}
              onMouseLeave={() => {
                setCursorState('default');
                setHoverNext(false);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2.5rem 0',
                borderBottom: hoverNext ? '1px solid var(--yellow)' : '1px solid rgba(107,149,153,0.2)',
                cursor: 'pointer',
                transition: 'border-color 0.4s ease',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--yellow)',
                    display: 'block',
                    marginBottom: '0.6rem',
                    fontWeight: 700,
                  }}
                >
                  {nextProject.category} // {nextProject.client}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                    letterSpacing: '-0.03em',
                    color: hoverNext ? 'var(--yellow)' : 'var(--cloud)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {nextProject.title}
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: hoverNext ? 'var(--cloud)' : 'var(--teal)', transition: 'color 0.3s', fontWeight: 600 }}>
                  View Project
                </span>
                <span
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    border: hoverNext ? '1px solid var(--yellow)' : '1px solid rgba(238,240,238,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: hoverNext ? 'var(--deep)' : 'var(--cloud)',
                    backgroundColor: hoverNext ? 'var(--yellow)' : 'transparent',
                    transform: hoverNext ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen CTA + Directory Footer */}
      <CtaFooter
        eyebrow="READY FOR A TAILORED PRODUCTION?"
        titlePrefix="Let's build a film of this"
        titleHighlight="caliber."
        subtext={`Inspired by ${project.title}? Every production begins with a conversation. Let us create a visual treatment tailored to your brand.`}
        buttonText="Initiate A Similar Production"
        buttonIcon="✨"
        buttonLink="/contact"
        auraColor="rgba(242,211,79,0.16)"
      />
    </div>
  );
}
