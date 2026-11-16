import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = 'ADS SHOOT · REELS PRODUCTION · SHORT FILMS MAKING · VIDEO EDITING · SNAPIT STUDIOZ · NATHAM · ';
const REPEAT = 4;
const fullText = MARQUEE_TEXT.repeat(REPEAT);

function renderMarqueeContent(text) {
  return text.split('SNAPIT STUDIOZ').map((part, i, arr) => (
    <React.Fragment key={i}>
      <span>{part}</span>
      {i < arr.length - 1 && (
        <span style={{ color: 'var(--yellow)' }}>SNAPIT STUDIOZ</span>
      )}
    </React.Fragment>
  ));
}

export default function Marquee() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const animRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const track = trackRef.current;
    if (!track) return;

    // Set initial position
    gsap.set(track, { x: 0 });

    const ctx = gsap.context(() => {
      // Measure full track width for one copy
      const totalWidth = track.scrollWidth / 2;

      // Infinite loop
      animRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 24,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Velocity-based speed + skew
      let currentSkew = 0;
      let lastProgress = 0;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = (self.progress - lastProgress) * 1000;
          lastProgress = self.progress;

          // Speed modifier
          const speedFactor = 1 + Math.abs(velocity) * 0.5;
          if (animRef.current) {
            animRef.current.timeScale(velocity < 0 ? -speedFactor : speedFactor);
          }

          // Skew
          const targetSkew = gsap.utils.clamp(-8, 8, velocity * 2);
          currentSkew += (targetSkew - currentSkew) * 0.1;
          gsap.set(track, { skewX: currentSkew });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      animRef.current = null;
    };
  }, [prefersReduced]);

  const content = (
    <span style={{ whiteSpace: 'nowrap', paddingRight: '2rem' }}>
      {renderMarqueeContent(fullText)}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Services marquee"
      style={{
        background: 'var(--mid)',
        borderTop: '1px solid rgba(107,149,153,0.2)',
        borderBottom: '1px solid rgba(107,149,153,0.2)',
        padding: '1.2rem 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          willChange: 'transform',
        }}
      >
        {/* Duplicate for seamless loop */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            textTransform: 'uppercase',
            color: 'var(--cloud)',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            paddingRight: '2rem',
          }}
        >
          {renderMarqueeContent(fullText)}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            textTransform: 'uppercase',
            color: 'var(--cloud)',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            paddingRight: '2rem',
          }}
        >
          {renderMarqueeContent(fullText)}
        </span>
      </div>
    </section>
  );
}

