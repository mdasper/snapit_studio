import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '', label: 'Core Disciplines (Video, Photo, Audio)' },
];

function StatItem({ value, suffix, label, animate }) {
  const numberRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!animate || prefersReduced) return;
    const el = numberRef.current;
    if (!el) return;

    const obj = { count: 0 };
    gsap.to(obj, {
      count: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.count) + suffix;
      },
      onComplete: () => {
        el.textContent = value + suffix;
      },
    });
  }, [animate, value, suffix, prefersReduced]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      <span
        ref={numberRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          color: 'var(--yellow)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          display: 'block',
          marginBottom: '0.75rem',
        }}
      >
        {prefersReduced ? value + suffix : '0' + suffix}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
          color: 'rgba(238,240,238,0.6)',
          lineHeight: 1.4,
          maxWidth: '160px',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setTriggered(true);
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setTriggered(true),
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="statistics"
      style={{
        background: 'var(--mid)',
        padding: 'clamp(5rem, 10vh, 10rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative element */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(242,211,79,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: 'var(--teal)',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: 0.8,
        }}
      >
        By the numbers
      </p>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 0,
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              borderRight: i < STATS.length - 1 ? '1px solid rgba(107,149,153,0.2)' : 'none',
            }}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              animate={triggered}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

