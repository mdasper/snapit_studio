import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax — ScrollTrigger scrub parallax wrapper
 * Props:
 *   - speed: parallax speed multiplier (default 0.4)
 *   - direction: 'y' | 'x' (default 'y')
 *   - children, className
 */
export default function Parallax({
  children,
  speed = 0.4,
  direction = 'y',
  className = '',
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || prefersReduced) return;

    const distance = inner.offsetHeight * speed;

    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.fromTo(
        inner,
        { [direction]: -distance / 2 },
        { [direction]: distance / 2, ease: 'none' }
      ),
    });

    return () => {
      st.kill();
      gsap.set(inner, { clearProps: 'all' });
    };
  }, [speed, direction, prefersReduced]);

  return (
    <div ref={outerRef} className={className} style={{ overflow: 'hidden' }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

