import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Magnetic — Magnetic button wrapper with GSAP quickTo, disabled on touch
 * Props:
 *   - strength: magnetic pull strength (default 0.5)
 *   - children: button/element content
 */
export default function Magnetic({ children, strength = 0.5, className = '' }) {
  const ref = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    quickX.current = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    quickY.current = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      quickX.current(dx);
      quickY.current(dy);
    };

    const onLeave = () => {
      quickX.current(0);
      quickY.current(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, prefersReduced]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}

