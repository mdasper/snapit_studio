import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from '../components/ui/Magnetic';
import CtaFooter from '../components/sections/CtaFooter';

const teamMembers = [
  {
    name: 'Karthik Raman',
    role: 'Creative Director & Founder',
    specialty: 'Ads Direction, Storyboarding, Viral Concepting',
    initials: 'KR',
    image: '/media/team_director.jpg',
  },
  {
    name: 'Siddharth Iyer',
    role: 'Director of Photography',
    specialty: 'Anamorphic Optics, Cinema Camera Rigs, Lighting',
    initials: 'SI',
    image: '/media/team_dop.jpg',
  },
  {
    name: 'Ananya Rajan',
    role: 'Chief Audio Engineer',
    specialty: 'Sonic Branding, Dialogue Mixing, Foley Design',
    initials: 'AR',
    image: '/media/team_sound.jpg',
  },
  {
    name: 'Vignesh Balan',
    role: 'Lead Colorist & Post Supervisor',
    specialty: 'ACES Color Science, DaVinci Studio, Theatrical DCP',
    initials: 'VB',
    image: '/media/team_editor.jpg',
  },
];

const studioPrinciples = [
  {
    title: 'The Intentional Frame',
    desc: 'Nothing in our compositions exists by accident. Every light beam, shade, and focal plane is deliberate.',
    vocab: 'FRAME // 01',
    icon: '◎',
  },
  {
    title: 'Viral Rhythm & Flow',
    desc: 'Whether it is a 15-second viral reel or a 30-minute short film, pacing and musicality drive maximum audience engagement.',
    vocab: 'RHYTHM // 02',
    icon: '◈',
  },
  {
    title: 'Zero Cookie-Cutter',
    desc: 'Every brand has a distinct heartbeat. We reject templates in favour of tailor-made cinema language.',
    vocab: 'CINEMA // 03',
    icon: '◉',
  },
];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '8+', label: 'Years in Frame' },
  { value: '4', label: 'Core Disciplines' },
];

export default function About() {
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
            marginBottom: '5rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
              The Studio Story // Natham, Tamil Nadu
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
            We Are <span style={{ color: 'var(--yellow)' }}>SNAPIT STUDIOZ.</span>
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
            Headquartered in Natham, Tamil Nadu with a dedicated mission: bring feature-film production standards,
            relentless optical discipline, and viral engagement to Ads Shoot, Reels Production, Short Films Making, and Professional Video Editing.
          </p>
        </div>

        {/* Manifesto split layout - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 6rem)',
            alignItems: 'center',
            marginBottom: '6rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Left text */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: 'var(--cloud)',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              A Camera Is Only As Powerful As The Story In Front Of It.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--teal)', marginBottom: '1.25rem' }}>
              We started SNAPIT STUDIOZ in Natham because we were exhausted by disposable, flat media. In an era
              where algorithms push volume over resonance, we treat every single production — from high-energy Instagram reels to commercial brand TVCs and festival short films — like an original work of art.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--teal)', marginBottom: '2.5rem' }}>
              Whether we are operating cinema camera rigs on location across Tamil Nadu, capturing nuanced commercial product details, or mastering an ACES color grade in our editing suite, our work is defined by craft you can feel in the chest.
            </p>

            {/* stat row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                      color: 'var(--yellow)',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {s.value}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 600 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: cinematic studio badge with HQ photo */}
          <div
            style={{
              position: 'relative',
              borderRadius: '2rem',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '460px',
              overflow: 'hidden',
              border: '1px solid rgba(107,149,153,0.35)',
              backgroundColor: 'var(--mid)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Background image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/media/studio_hq.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(27,67,72,0.92) 0%, rgba(16,40,44,0.96) 100%)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', fontWeight: 700 }}>
                ESTD. 2017 // NATHAM
              </span>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem 0' }}>
              <img
                src="/logo.png"
                alt="SNAPIT STUDIOZ Logo"
                style={{
                  width: 'clamp(6rem, 16vw, 9rem)',
                  height: 'clamp(6rem, 16vw, 9rem)',
                  borderRadius: '50%',
                  objectFit: 'contain',
                  border: '2px solid var(--yellow)',
                  boxShadow: '0 0 40px rgba(242,211,79,0.35)',
                  margin: '0 auto 1.25rem',
                  display: 'block',
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  letterSpacing: '0.04em',
                  color: 'var(--cloud)',
                  marginBottom: '0.35rem',
                }}
              >
                SNAPIT STUDIOZ
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', fontWeight: 700 }}>
                Ads · Reels · Short Films · Editing
              </p>
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(107,149,153,0.25)',
                paddingTop: '1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'var(--teal)',
              }}
            >
              <span>LAT: 10.2366° N</span>
              <span>LONG: 78.2329° E (NATHAM)</span>
            </div>
          </div>
        </div>

        {/* Three Principles - FULL WIDTH */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '6rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid rgba(107,149,153,0.2)',
              paddingBottom: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>
              Our Code of Craft
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                color: 'var(--cloud)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              The Three Principles
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              width: '100%',
            }}
          >
            {studioPrinciples.map((p) => (
              <PrincipleCard key={p.title} principle={p} />
            ))}
          </div>
        </div>

        {/* Team with Unique Portraits - FULL WIDTH */}
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
              borderBottom: '1px solid rgba(107,149,153,0.2)',
              paddingBottom: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>
              The Crew
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                color: 'var(--cloud)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Directing The Vision
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              width: '100%',
            }}
          >
            {teamMembers.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </main>

      {/* Fullscreen CTA + Directory Footer */}
      <CtaFooter
        eyebrow="CREATIVE ALLIANCE // NATHAM"
        titlePrefix="Let's collaborate on the next"
        titleHighlight="cinematic triumph."
        subtext="We partner with passionate brand founders, agency directors, and indie filmmakers across Tamil Nadu and beyond. Step inside our studio."
        buttonText="Connect With Our Directors"
        buttonIcon="🤝"
        buttonLink="/contact"
        auraColor="rgba(107,149,153,0.2)"
      />
    </div>
  );
}

function PrincipleCard({ principle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(2rem, 3.5vw, 3rem)',
        borderRadius: '1.25rem',
        border: hovered ? '1px solid var(--yellow)' : '1px solid rgba(107,149,153,0.2)',
        backgroundColor: 'var(--mid)',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '2.8rem',
          color: 'var(--yellow)',
          display: 'block',
          marginBottom: '1rem',
        }}
      >
        {principle.icon}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--yellow)', display: 'block', marginBottom: '0.6rem', fontWeight: 700 }}>
        {principle.vocab}
      </span>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.4rem',
          color: 'var(--cloud)',
          marginBottom: '0.85rem',
        }}
      >
        {principle.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.925rem', lineHeight: 1.7, color: 'rgba(238,240,238,0.8)' }}>
        {principle.desc}
      </p>
    </div>
  );
}

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '1.25rem',
        border: hovered ? '1px solid var(--yellow)' : '1px solid rgba(107,149,153,0.22)',
        backgroundColor: 'var(--mid)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* Unique Photo Frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0c1e21',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${member.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(16,40,44,0.95) 0%, transparent 60%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.25rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '100px',
            backgroundColor: 'rgba(16,40,44,0.85)',
            border: '1px solid rgba(242,211,79,0.35)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: 'var(--yellow)',
          }}
        >
          {member.initials}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: 'var(--cloud)',
            marginBottom: '0.3rem',
          }}
        >
          {member.name}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--yellow)', fontWeight: 600, marginBottom: '0.85rem' }}>
          {member.role}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(238,240,238,0.7)', borderTop: '1px solid rgba(107,149,153,0.15)', paddingTop: '0.85rem', marginTop: 'auto' }}>
          {member.specialty}
        </p>
      </div>
    </div>
  );
}
