import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollTrigger — gsap.context-based ScrollTrigger helper with auto-cleanup
 * @param {Function} setup - callback(context) where you create ScrollTriggers
 * @param {Array} deps - dependency array for re-running
 */
export function useScrollTrigger(setup, deps = []) {
  const ctx = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    ctx.current = gsap.context(() => {
      setup();
    }, el);

    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

export default useScrollTrigger;

