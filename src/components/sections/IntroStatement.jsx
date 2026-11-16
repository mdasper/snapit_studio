import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SplitReveal from '../ui/SplitReveal';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  'We are SNAPIT STUDIOZ — a Natham-based creative production house specializing in Ads Shoot, Reels Production, Short Films Making, and Video Editing. Every frame we capture, every story we sculpt, every cut we craft is driven by one belief: your story deserves to be told with cinematic perfection.';

// Words to highlight in yellow
const HIGHLIGHT_WORDS = new Set(['SNAPIT', 'STUDIOZ', 'Natham-based', 'Ads', 'Reels', 'Films', 'Editing.', 'cinematic', 'perfection.']);

function buildWords(text) {
  return text.split(' ').map((word, i) => ({
    word,
    highlight: HIGHLIGHT_WORDS.has(word),
    id: i,
  }));
}

export default function IntroStatement() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const wordSpans = container.querySelectorAll('[data-word]');

    const ctx = gsap.context(() => {
      // Set initial opacity
      gsap.set(wordSpans, { opacity: 0.15 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = wordSpans.length;
          wordSpans.forEach((span, i) => {
            const wordProgress = gsap.utils.clamp(0, 1, (progress * total - i + 1));
            gsap.set(span, { opacity: gsap.utils.interpolate(0.15, 1, wordProgress) });

            // Apply yellow highlight when near full opacity
            if (span.dataset.highlight === 'true') {
              const color = wordProgress > 0.7 ? 'var(--yellow)' : 'var(--cloud)';
              span.style.color = color;
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const words = buildWords(STATEMENT);

  return (
    <section
      ref={sectionRef}
      id="intro-statement"
      style={{
        background: 'var(--mid)',
        padding: '10vh clamp(1.5rem, 8vw, 10rem)',
        position: 'relative',
      }}
    >
      <SplitReveal
        as="p"
        trigger="scroll"
        className="intro-label"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: 'var(--teal)',
          textTransform: 'uppercase',
          marginBottom: '3rem',
          opacity: 0.8,
        }}
      >
        About Us
      </SplitReveal>

      <p
        ref={containerRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(1.5rem, 2.8vw, 2.8rem)',
          lineHeight: 1.3,
          color: 'var(--cloud)',
          maxWidth: '1100px',
          margin: 0,
        }}
      >
        {words.map(({ word, highlight, id }, i) => (
          <span
            key={id}
            data-word
            data-highlight={highlight ? 'true' : 'false'}
            style={{
              display: 'inline-block',
              marginRight: '0.3em',
              opacity: prefersReduced ? 1 : 0.15,
              color: 'var(--cloud)',
              transition: 'color 0.3s ease',
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}

