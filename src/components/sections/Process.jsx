import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SplitReveal from '../ui/SplitReveal';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    name: 'Plan',
    icon: '📋',
    bgImage: '/media/director_monitor.jpg',
    desc: 'We begin every project with deep creative discovery — aligning on script, narrative arc, moodboards, and camera blocking before rolling.',
  },
  {
    num: '02',
    name: 'Shoot',
    icon: '🎬',
    bgImage: '/media/camera_rig.jpg',
    desc: 'Our on-set teams combine high-grade cinema rigs, anamorphic glass, and calibrated lighting to capture every scene with intention.',
  },
  {
    num: '03',
    name: 'Edit',
    icon: '✂️',
    bgImage: '/media/video_editing.jpg',
    desc: 'Post-production where pacing comes alive — precision offline cuts, rhythmic flow, ACES color grading, and dynamic audio soundscapes.',
  },
  {
    num: '04',
    name: 'Deliver',
    icon: '🎉',
    bgImage: '/media/color_grading.jpg',
    desc: 'From theatrical DCP masters to viral 4K Instagram reels and broadcast commercial deliveries — pristine exports ready for the world.',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const totalCards = cards.length;

      // Card 0 starts visible in center
      gsap.set(cards[0], { yPercent: 0, scale: 1, zIndex: 1 });

      // Cards 1, 2, 3 start pushed 120% below view
      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { yPercent: 120, scale: 1, zIndex: i + 1 });
      }

      // Smooth scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(totalCards - 1) * 100}%`,
          pin: stickyRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(totalCards - 1, Math.round(self.progress * (totalCards - 1)));
            setActiveStep(step);
          },
        },
      });

      // Stacking animation: card i slides up smoothly over card i-1, while card i-1 scales down
      for (let i = 1; i < totalCards; i++) {
        const prevCard = cards[i - 1];
        const curCard = cards[i];
        const prevOverlay = prevCard.querySelector('[data-overlay]');

        tl.to(curCard, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.inOut',
        }, i - 1);

        tl.to(prevCard, {
          scale: 0.93,
          duration: 1,
          ease: 'power2.inOut',
        }, i - 1);

        if (prevOverlay) {
          tl.to(prevOverlay, {
            opacity: 0.55,
            duration: 1,
            ease: 'power2.inOut',
          }, i - 1);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        background: 'var(--deep)',
        height: (prefersReduced || isMobile) ? 'auto' : `${STEPS.length * 100}vh`,
        position: 'relative',
      }}
    >
      <div
        ref={stickyRef}
        style={{
          minHeight: isMobile ? 'auto' : '100svh',
          height: isMobile ? 'auto' : '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: isMobile ? '4.5rem 1rem 3rem' : 'clamp(1rem, 3vw, 2rem)',
          overflow: isMobile ? 'visible' : 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Section title header */}
        <div
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? 'auto' : 'clamp(1rem, 3vh, 3rem)',
            left: isMobile ? 'auto' : 'clamp(1rem, 5vw, 6rem)',
            marginBottom: isMobile ? '2rem' : 0,
            alignSelf: isMobile ? 'flex-start' : 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 10,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--yellow)', display: 'inline-block' }} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.68rem, 1.4vw, 0.75rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              fontWeight: 700,
            }}
          >
            The Execution Workflow // 4 Phases
          </span>
        </div>

        {/* Stacking cards container */}
        <div
          style={{
            position: 'relative',
            width: 'min(94vw, 1280px)',
            height: isMobile ? 'auto' : 'clamp(330px, 52vh, 460px)',
            display: isMobile ? 'flex' : 'block',
            flexDirection: isMobile ? 'column' : 'initial',
            gap: isMobile ? '1.5rem' : 0,
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                position: isMobile ? 'relative' : 'absolute',
                inset: isMobile ? 'auto' : 0,
                minHeight: isMobile ? '340px' : 'auto',
                borderRadius: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                backgroundImage: `url(${step.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 'clamp(1.2rem, 3.5vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                willChange: 'transform',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(107, 149, 153, 0.2)',
                backgroundColor: 'var(--mid)',
              }}
            >
              {/* Deep Cinematic Contrast Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16,40,44,0.98) 0%, rgba(16,40,44,0.75) 50%, rgba(16,40,44,0.4) 100%)',
                  borderRadius: 'inherit',
                  zIndex: 1,
                }}
              />

              {/* Stack Dimming Overlay */}
              <div
                data-overlay
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#000',
                  borderRadius: 'inherit',
                  opacity: 0,
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Decorative Step Badge Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(0.85rem, 2.5vw, 1.75rem)',
                  right: 'clamp(0.85rem, 2.5vw, 1.75rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '100px',
                  background: 'rgba(16, 40, 44, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(242, 211, 79, 0.35)',
                  zIndex: 3,
                }}
              >
                <span style={{ fontSize: '1rem' }}>{step.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    color: 'var(--yellow)',
                    letterSpacing: '0.1em',
                  }}
                >
                  PHASE {step.num}
                </span>
              </div>

              {/* Content text */}
              <div style={{ position: 'relative', zIndex: 3, maxWidth: '600px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    color: 'var(--yellow)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.3rem',
                    fontWeight: 700,
                  }}
                >
                  Step {step.num} &bull; Methodology
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
                    color: 'var(--cloud)',
                    margin: '0 0 0.6rem',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                    color: 'rgba(238, 240, 238, 0.9)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Film-strip progress indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1rem, 2.5vh, 2.2rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.45rem',
            zIndex: 10,
          }}
          aria-label="Process steps progress"
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                width: '56px',
                height: '32px',
                borderRadius: '6px',
                border: i === activeStep ? '1.5px solid var(--yellow)' : '1px solid rgba(107,149,153,0.3)',
                background: i === activeStep ? 'var(--yellow)' : 'rgba(16, 40, 44, 0.7)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: i === activeStep ? '0 4px 15px rgba(242, 211, 79, 0.35)' : 'none',
              }}
              role="presentation"
            >
              {/* Film perforations */}
              <div
                style={{
                  position: 'absolute',
                  left: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '10px',
                  borderRadius: '1px',
                  background: i === activeStep ? 'rgba(16,40,44,0.4)' : 'rgba(107,149,153,0.3)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '10px',
                  borderRadius: '1px',
                  background: i === activeStep ? 'rgba(16,40,44,0.4)' : 'rgba(107,149,153,0.3)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  color: i === activeStep ? 'var(--deep)' : 'var(--cloud)',
                  letterSpacing: '0.05em',
                }}
              >
                {step.num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
