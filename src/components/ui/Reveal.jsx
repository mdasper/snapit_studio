import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal — ScrollTrigger opacity+y reveal with cleanup
 * Props:
 *   - delay: animation delay
 *   - duration: animation duration
 *   - y: initial y offset (default 40)
 *   - once: only reveal once (default true)
 *   - children, className
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  once = true,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(el, { opacity: 0, y, duration: duration * 0.5 });
          },
    });

    return () => {
      st.kill();
      gsap.set(el, { clearProps: 'all' });
    };
  }, [delay, duration, y, once, prefersReduced]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

