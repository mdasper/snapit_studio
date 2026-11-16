import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useMouseParallax — GSAP quickTo mouse parallax hook
 * @param {Object} options
 * @param {number} options.strength - parallax movement strength (default 20)
 * @param {number} options.duration - quickTo duration (default 0.6)
 * @returns {Object} ref to attach to the element
 */
export function useMouseParallax({ strength = 20, duration = 0.6 } = {}) {
  const ref = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for touch device
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    quickX.current = gsap.quickTo(el, 'x', { duration, ease: 'power3.out' });
    quickY.current = gsap.quickTo(el, 'y', { duration, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      quickX.current(dx * strength);
      quickY.current(dy * strength);
    };

    const handleMouseLeave = () => {
      quickX.current(0);
      quickY.current(0);
    };

    const parent = el.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, duration]);

  return ref;
}

export default useMouseParallax;

