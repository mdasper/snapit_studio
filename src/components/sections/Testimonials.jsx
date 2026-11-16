import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const testimonials = [
  {
    id: 1,
    quote: "Working with SNAPIT STUDIOZ on our ads shoot transformed our brand story into pure visual poetry. Every frame felt intentional, every transition had purpose.",
    author: "Priya Sharma",
    role: "Creative Director",
    company: "Aurum Jewels",
    tag: "Commercial Ads Shoot",
    rating: "★★★★★",
    image: "/media/ads_shoot.jpg",
  },
  {
    id: 2,
    quote: "Their reels production brought an electric viral energy to our flagship product campaign that resonated across millions of organic views on Instagram.",
    author: "Arjun Mehta",
    role: "Head of Marketing",
    company: "Metro Retail",
    tag: "Viral Reels Production",
    rating: "★★★★★",
    image: "/media/reels_production.jpg",
  },
  {
    id: 3,
    quote: "From our scriptwriting and on-location shoot in Natham to festival DCP mastering, they directed our short film with world-class cinematic discipline.",
    author: "Deepa Krishnan",
    role: "Independent Filmmaker",
    company: "Vivid Shorts",
    tag: "Short Films Making",
    rating: "★★★★★",
    image: "/media/short_film.jpg",
  },
  {
    id: 4,
    quote: "Their post-production team delivers flawless rhythm cuts, ACES DaVinci color grading, and surgical sound mixing that elevate every single frame.",
    author: "Rahul Nair",
    role: "Executive Producer",
    company: "Craft Cinema",
    tag: "Video Editing & Post",
    rating: "★★★★★",
    image: "/media/video_editing.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const nextSlide = () => {
    setActiveIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem)',
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid rgba(107, 149, 153, 0.15)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,211,79,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '3.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(107, 149, 153, 0.2)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--teal)',
                  fontWeight: 600,
                }}
              >
                Client Echoes // Testimonials
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                color: 'var(--cloud)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Voices From The <span style={{ color: 'var(--yellow)' }}>Set.</span>
            </h2>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--teal)',
                letterSpacing: '0.1em',
              }}
            >
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={prevSlide}
                aria-label="Previous Testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(107, 149, 153, 0.3)',
                  background: 'rgba(27, 67, 72, 0.3)',
                  color: 'var(--cloud)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--yellow)';
                  e.currentTarget.style.background = 'var(--yellow)';
                  e.currentTarget.style.color = 'var(--deep)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(107, 149, 153, 0.3)';
                  e.currentTarget.style.background = 'rgba(27, 67, 72, 0.3)';
                  e.currentTarget.style.color = 'var(--cloud)';
                }}
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(107, 149, 153, 0.3)',
                  background: 'rgba(27, 67, 72, 0.3)',
                  color: 'var(--cloud)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--yellow)';
                  e.currentTarget.style.background = 'var(--yellow)';
                  e.currentTarget.style.color = 'var(--deep)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(107, 149, 153, 0.3)';
                  e.currentTarget.style.background = 'rgba(27, 67, 72, 0.3)';
                  e.currentTarget.style.color = 'var(--cloud)';
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '1.75rem',
            background: 'linear-gradient(135deg, rgba(27,67,72,0.4) 0%, rgba(16,40,44,0.7) 100%)',
            border: '1.5px solid rgba(107, 149, 153, 0.25)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(107,149,153,0.05)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Left: Quote text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '100px',
                  background: 'rgba(242, 211, 79, 0.1)',
                  border: '1px solid rgba(242, 211, 79, 0.35)',
                  color: 'var(--yellow)',
                  fontWeight: 700,
                }}
              >
                {active.tag}
              </span>
              <span style={{ color: 'var(--yellow)', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
                {active.rating}
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
                lineHeight: 1.4,
                color: 'var(--cloud)',
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
              }}
            >
              "{active.quote}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(107, 149, 153, 0.2)', paddingTop: '1.25rem' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--teal) 0%, var(--mid) 100%)',
                  color: 'var(--yellow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: '1.5px solid rgba(242, 211, 79, 0.4)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  flexShrink: 0,
                }}
              >
                {active.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'var(--cloud)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {active.author}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--teal)',
                    margin: '0.2rem 0 0',
                  }}
                >
                  {active.role} &bull; <strong style={{ color: 'rgba(238,240,238,0.85)' }}>{active.company}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Production frame visual */}
          <div
            style={{
              position: 'relative',
              borderRadius: '1.25rem',
              aspectRatio: '16/10',
              overflow: 'hidden',
              backgroundImage: `url(${active.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(107, 149, 153, 0.25)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(16,40,44,0.85) 0%, rgba(16,40,44,0.1) 60%, transparent 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cloud)',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(6px)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Verified Production Client
              </span>
            </div>
          </div>
        </div>

        {/* Carousel slide selector bars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '2.5rem' }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: '6px',
                width: activeIndex === idx ? '48px' : '14px',
                borderRadius: '100px',
                background: activeIndex === idx ? 'var(--yellow)' : 'rgba(107, 149, 153, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
