import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — Thin yellow bar at top of page tracking scroll %
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: 0,
        background: 'var(--yellow, #f2d34f)',
        zIndex: 998,
        pointerEvents: 'none',
        transformOrigin: 'left',
        transition: 'width 0.1s linear',
      }}
      ref={barRef}
    />
  );
}

