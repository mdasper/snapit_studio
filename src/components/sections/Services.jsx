import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SplitReveal from '../ui/SplitReveal';
import { services } from '../../data/services';

gsap.registerPlugin(ScrollTrigger);

function ServiceRow({ service, index, total, onHover, isHovered, isDimmed }) {
  const rowRef = useRef(null);
  const previewRef = useRef(null);
  const arrowRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || isMobile) return;
    quickX.current = gsap.quickTo(preview, 'x', { duration: 0.4, ease: 'power3.out' });
    quickY.current = gsap.quickTo(preview, 'y', { duration: 0.4, ease: 'power3.out' });
  }, [isMobile]);

  const handleMouseMove = (e) => {
    if (!quickX.current || !quickY.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    quickX.current(e.clientX - rect.left - 100);
    quickY.current(e.clientY - rect.top - 100);
  };

  const handleMouseEnter = () => {
    onHover(index);
    if (arrowRef.current) gsap.to(arrowRef.current, { rotation: 45, duration: 0.3, ease: 'power2.out' });
    if (previewRef.current) gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    onHover(null);
    if (arrowRef.current) gsap.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: 'power2.out' });
    if (previewRef.current) gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.out' });
  };

  const gradients = [
    'linear-gradient(135deg, #10282c, #6b9599)',
    'linear-gradient(135deg, #1b4348, #f2d34f33)',
    'linear-gradient(135deg, #6b9599, #10282c)',
  ];

  return (
    <div
      ref={rowRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(107,149,153,0.2)',
        opacity: isDimmed ? 0.3 : 1,
        transition: 'opacity 0.3s ease',
        overflow: isMobile ? 'visible' : 'hidden',
      }}
    >
      {/* Desktop layout */}
      <div
        onClick={isMobile ? () => setExpanded(!expanded) : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '1.5rem 0' : '2rem 0',
          gap: '2rem',
          cursor: isMobile ? 'pointer' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--teal)',
              letterSpacing: '0.2em',
              minWidth: '2rem',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 7vw, 7rem)',
              color: 'var(--cloud)',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {service.title}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Sub-items on hover (desktop) */}
          {!isMobile && isHovered && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '300px', justifyContent: 'flex-end' }}>
              {service.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    color: 'var(--teal)',
                    border: '1px solid rgba(107,149,153,0.4)',
                    borderRadius: '100px',
                    padding: '0.3rem 0.8rem',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    animation: 'fadeInTag 0.3s ease forwards',
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <div
            ref={arrowRef}
            style={{
              width: '48px',
              height: '48px',
              border: '1.5px solid rgba(238,240,238,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cloud)',
              fontSize: '1.1rem',
              flexShrink: 0,
            }}
          >
            {isMobile ? (expanded ? '−' : '+') : '→'}
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      {isMobile && expanded && (
        <div style={{ paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {service.items.map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--teal)',
                  border: '1px solid rgba(107,149,153,0.4)',
                  borderRadius: '100px',
                  padding: '0.4rem 1rem',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Floating media preview (desktop) */}
      {!isMobile && (
        <div
          ref={previewRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '280px',
            height: '180px',
            borderRadius: '1.25rem',
            backgroundImage: `url(${service.image || '/media/ads_shoot.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid var(--yellow)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            opacity: 0,
            scale: 0.9,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('[data-row]'), {
        opacity: 0,
        y: 40,
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
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        background: 'var(--deep)',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <SplitReveal
          as="h2"
          trigger="scroll"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--cloud)',
            margin: 0,
          }}
        >
          Our Services
        </SplitReveal>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--teal)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
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
              total={services.length}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === i}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInTag {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

