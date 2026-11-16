import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import CtaFooter from '../components/sections/CtaFooter';

const productionPhases = [
  {
    num: '01',
    phase: 'Pre-Production',
    title: 'Concept & Blueprint',
    image: '/media/director_monitor.jpg',
    items: [
      'Scriptwriting & Creative Screenplays',
      'Visual Storyboarding & Moodboards',
      'Location Scouting across Natham & Tamil Nadu',
      'Casting, Actors & Model Procurement',
      'Technical Equipment & Lighting Planning',
    ],
  },
  {
    num: '02',
    phase: 'Production',
    title: 'Cinematic Capture',
    image: '/media/camera_rig.jpg',
    items: [
      'High-Resolution 4K/6K Multi-Cam Direction',
      'Cinema Camera Rigs with Anamorphic Glass',
      'Gimbal, Drone & High-Speed Tracking',
      'Precision Studio & Location Lighting',
      'Dedicated Multi-Track Audio Recording',
    ],
  },
  {
    num: '03',
    phase: 'Post-Production',
    title: 'The Finish Line',
    image: '/media/color_grading.jpg',
    items: [
      'Non-Linear Precision Offline Rhythm Editing',
      'ACES Color Grading in DaVinci Resolve',
      'Custom Sound Design & Foley Mixing',
      '2D/3D Motion Titles & Dynamic VFX',
      'Theatrical DCP & 4K Social Media Deliveries',
    ],
  },
];

const gearArsenal = [
  { category: 'Cinema Cameras', gear: 'Arri Alexa Mini LF, RED V-Raptor 8K, Sony FX6 / FX3' },
  { category: 'Glass & Optics', gear: 'Cooke Anamorphic /i, Zeiss Supreme Primes, Sony G-Master' },
  { category: 'Lighting & Grip', gear: 'Aputure 600d / 1200d, Nanlite Pavotubes, C-Stands & Rigs' },
  { category: 'Color & Mastering', gear: 'FSI Flanders Scientific XMP310 HDR Master Monitor, DaVinci Advanced Panels' },
];

export default function Services() {
  return (
    <div style={{ width: '100%', backgroundColor: 'var(--deep)' }}>
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          paddingTop: '8rem',
          paddingBottom: '4rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Header - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '4rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
              Studio Capabilities // Natham, Tamil Nadu
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--cloud)',
              marginBottom: '1.25rem',
            }}
          >
            Crafting Every <span style={{ color: 'var(--yellow)' }}>Medium.</span>
          </h1>
          <p
            style={{
              maxWidth: '56rem',
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              lineHeight: 1.75,
              color: 'var(--teal)',
              opacity: 0.9,
            }}
          >
            Specializing in Ads Shoot, Reels Production, Short Films Making, and Video Editing. From viral social campaigns to theatrical cinema releases, our Natham-based studio builds productions with uncompromising craft.
          </p>
        </div>

        {/* 4 Flagship Service Discipline Cards - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '6rem',
            boxSizing: 'border-box',
          }}
        >
          {services.map((svc, idx) => (
            <ServiceCard key={svc.id} svc={svc} idx={idx} />
          ))}
        </div>

        {/* Production Phases with Distinct Images - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '6rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'left', maxWidth: '40rem', marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>
              The Methodology
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                color: 'var(--cloud)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              How We Direct Your Production
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              width: '100%',
            }}
          >
            {productionPhases.map((phase) => (
              <div
                key={phase.num}
                style={{
                  borderRadius: '1.5rem',
                  backgroundColor: 'var(--mid)',
                  border: '1px solid rgba(107,149,153,0.22)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--yellow)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(107,149,153,0.22)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {/* Phase Image Header */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    backgroundColor: '#0c1e21',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${phase.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--mid) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '2rem',
                        color: 'var(--yellow)',
                        lineHeight: 1,
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                      }}
                    >
                      {phase.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--cloud)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(16,40,44,0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(242,211,79,0.3)',
                        fontWeight: 700,
                      }}
                    >
                      {phase.phase}
                    </span>
                  </div>
                </div>

                {/* Phase Body */}
                <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.45rem',
                      color: 'var(--cloud)',
                      letterSpacing: '-0.01em',
                      marginBottom: '1rem',
                    }}
                  >
                    {phase.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.8rem',
                      borderTop: '1px solid rgba(107,149,153,0.18)',
                      paddingTop: '1.25rem',
                    }}
                  >
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.9rem',
                          color: 'rgba(238,240,238,0.85)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--yellow)', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gear Arsenal - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '4rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              borderRadius: '1.5rem',
              backgroundColor: 'rgba(27,67,72,0.4)',
              border: '1px solid rgba(107,149,153,0.25)',
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient image backdrop */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '40%',
                height: '100%',
                backgroundImage: 'url(/media/studio_lights.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.12,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '2.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(107,149,153,0.2)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
                  Hardware & Tooling
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: 'var(--cloud)',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  Our Production Arsenal
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--teal)', letterSpacing: '0.08em', margin: 0 }}>
                Standard calibrated cinema kit stationed in Natham.
              </p>
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.25rem',
                width: '100%',
              }}
            >
              {gearArsenal.map((g) => (
                <div
                  key={g.category}
                  style={{
                    padding: '1.5rem 1.75rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(16,40,44,0.75)',
                    border: '1px solid rgba(107,149,153,0.2)',
                    transition: 'border-color 0.25s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(107,149,153,0.2)'}
                >
                  <h5
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--yellow)',
                      marginBottom: '0.6rem',
                      fontWeight: 700,
                    }}
                  >
                    {g.category}
                  </h5>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.925rem', fontWeight: 600, color: 'var(--cloud)', lineHeight: 1.55, margin: 0 }}>
                    {g.gear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen CTA + Directory Footer */}
      <CtaFooter
        eyebrow="PRODUCTION PACKAGES // NATHAM STUDIO"
        titlePrefix="Bring your next campaign"
        titleHighlight="to reality."
        subtext="Whether you require commercial ad shoots, high-volume viral reels, narrative short films, or multi-format video editing, we engineer every frame to perfection."
        buttonText="Request Production Estimate"
        buttonIcon="⚡"
        buttonLink="/contact"
        auraColor="rgba(242,211,79,0.18)"
      />
    </div>
  );
}

function ServiceCard({ svc, idx }) {
  const [hovered, setHovered] = useState(false);
  const bgImg = svc.image || '/media/ads_shoot.jpg';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.75rem',
        border: hovered ? '1px solid var(--yellow)' : '1px solid rgba(107,149,153,0.25)',
        backgroundColor: 'var(--mid)',
        marginBottom: '2.5rem',
        overflow: 'hidden',
        boxShadow: hovered ? '0 32px 80px rgba(0,0,0,0.5)' : '0 10px 35px rgba(0,0,0,0.25)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Cinema Image with Dark Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: hovered ? 0.35 : 0.18,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(27,67,72,0.92) 0%, rgba(16,40,44,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Giant Watermark Number */}
      <span
        style={{
          position: 'absolute',
          right: '2.5rem',
          top: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(6rem, 14vw, 12rem)',
          lineHeight: 1,
          color: 'var(--cloud)',
          opacity: hovered ? 0.08 : 0.035,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        0{idx + 1}
      </span>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'center',
        }}
      >
        {/* Left: title area */}
        <div>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>
            {svc.icon}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--yellow)',
              display: 'block',
              marginBottom: '0.6rem',
              fontWeight: 700,
            }}
          >
            Discipline 0{idx + 1}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              letterSpacing: '-0.02em',
              color: 'var(--cloud)',
              marginBottom: '1.25rem',
              lineHeight: 1.1,
            }}
          >
            {svc.title}
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(238,240,238,0.85)', marginBottom: '2rem', maxWidth: '38rem' }}>
            {svc.description}
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--yellow)',
              textDecoration: 'none',
              borderBottom: '2px solid rgba(242,211,79,0.4)',
              paddingBottom: '0.3rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--yellow)'}
            onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(242,211,79,0.4)'}
          >
            Request Quote for {svc.title} →
          </Link>
        </div>

        {/* Right: specialisations grid */}
        <div
          style={{
            backgroundColor: 'rgba(16,40,44,0.7)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '1.25rem',
            border: '1px solid rgba(107,149,153,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              marginBottom: '1.25rem',
              fontWeight: 700,
            }}
          >
            Included Specializations
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
              gap: '0.75rem',
            }}
          >
            {svc.items.map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '0.6rem',
                  backgroundColor: 'rgba(27,67,72,0.6)',
                  border: '1px solid rgba(107,149,153,0.2)',
                  fontSize: '0.88rem',
                  color: 'var(--cloud)',
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--yellow)';
                  e.currentTarget.style.backgroundColor = 'rgba(27,67,72,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(107,149,153,0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(27,67,72,0.6)';
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--yellow)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
