import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SplitReveal from '../ui/SplitReveal';
import { services } from '../../data/services';

gsap.registerPlugin(ScrollTrigger);

function ServiceRow({ service, index, onHover, isHovered, isMobile }) {
  return (
    <Link
      to="/services"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'block',
        textDecoration: 'none',
        position: 'relative',
        borderBottom: `1px solid ${isHovered ? 'rgba(242,211,79,0.35)' : 'rgba(107,149,153,0.2)'}`,
        background: isHovered ? 'rgba(107,149,153,0.06)' : 'transparent',
        padding: isMobile ? '1.35rem 0.5rem' : '1.75rem 1.25rem',
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
    >
      {/* Main Row: 01 + Title on Left, Arrow on Right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
        }}
      >
        {/* Left: Index + Service Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              color: isHovered ? 'var(--yellow)' : 'var(--teal)',
              letterSpacing: '0.15em',
              fontWeight: 700,
              minWidth: isMobile ? '1.8rem' : '2.4rem',
              transition: 'color 0.3s ease',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isMobile ? 'clamp(1.15rem, 5vw, 1.5rem)' : 'clamp(1.4rem, 2.5vw, 2.25rem)',
              color: isHovered ? 'var(--yellow)' : 'var(--cloud)',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              transform: isHovered && !isMobile ? 'translateX(6px)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}
          >
            {service.title}
          </h3>
        </div>

        {/* Center: Key Capabilities Pills (Desktop Only) */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              flex: 1,
              padding: '0 1.5rem',
            }}
          >
            {service.items.slice(0, 3).map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: isHovered ? 'var(--cloud)' : 'rgba(238,240,238,0.7)',
                  background: isHovered ? 'rgba(107,149,153,0.18)' : 'rgba(107,149,153,0.08)',
                  border: `1px solid ${isHovered ? 'rgba(242,211,79,0.3)' : 'rgba(107,149,153,0.25)'}`,
                  borderRadius: '100px',
                  padding: '0.25rem 0.75rem',
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Right: Sleek Arrow Button */}
        <div
          style={{
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            borderRadius: '50%',
            border: `1.5px solid ${isHovered ? 'var(--yellow)' : 'rgba(238,240,238,0.25)'}`,
            background: isHovered ? 'rgba(242,211,79,0.12)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHovered ? 'var(--yellow)' : 'var(--cloud)',
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            flexShrink: 0,
            transform: isHovered && !isMobile ? 'translateX(4px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          →
        </div>
      </div>

      {/* Mobile Pills: Positioned neatly underneath with proper indentation */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginTop: '0.75rem',
            paddingLeft: '2.8rem',
          }}
        >
          {service.items.slice(0, 2).map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'rgba(238,240,238,0.75)',
                background: 'rgba(107,149,153,0.12)',
                border: '1px solid rgba(107,149,153,0.28)',
                borderRadius: '100px',
                padding: '0.25rem 0.65rem',
                letterSpacing: '0.02em',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('[data-row]'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        background: 'var(--deep)',
        padding: isMobile ? '3.5rem clamp(1.25rem, 5vw, 2.5rem)' : 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
        <SplitReveal
          as="h2"
          trigger="scroll"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3vw, 2.4rem)',
            color: 'var(--cloud)',
            margin: 0,
          }}
        >
          Our Services
        </SplitReveal>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--teal)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          What we do
        </span>
      </div>

      <div style={{ borderTop: '1px solid rgba(107,149,153,0.2)' }}>
        {services.map((service, i) => (
          <div key={service.id} data-row>
            <ServiceRow
              service={service}
              index={i}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === i}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
