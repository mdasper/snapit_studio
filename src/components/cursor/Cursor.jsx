import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

const CursorContext = createContext({
  setCursorState: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export { CursorContext };

export default function Cursor({ children }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [isTouch, setIsTouch] = useState(false);

  const quickDotX = useRef(null);
  const quickDotY = useRef(null);
  const quickRingX = useRef(null);
  const quickRingY = useRef(null);

  useEffect(() => {
    // Detect touch device
    const touch = window.matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    quickDotX.current = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' });
    quickDotY.current = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' });
    quickRingX.current = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    quickRingY.current = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let isVisible = false;

    const onMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      quickDotX.current?.(e.clientX);
      quickDotY.current?.(e.clientY);
      quickRingX.current?.(e.clientX);
      quickRingY.current?.(e.clientY);
    };

    const onEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    const onLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    // Auto-detect cursor state from hovered element
    const onOver = (e) => {
      const explicit = e.target.closest('[data-cursor]');
      if (explicit) {
        setCursorState(explicit.dataset.cursor);
      } else if (e.target.closest('a, button, [role="button"], input[type="submit"]')) {
        setCursorState('link');
      } else if (e.target.closest('video, [data-video]')) {
        setCursorState('video');
      } else if (e.target.closest('[data-drag]')) {
        setCursorState('drag');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  // Update cursor appearance based on state
  useEffect(() => {
    if (isTouch) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    switch (cursorState) {
      case 'link':
        gsap.to(ring, { width: 56, height: 56, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { width: 6, height: 6, duration: 0.25 });
        break;
      case 'video':
        gsap.to(ring, { width: 72, height: 72, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { width: 4, height: 4, duration: 0.25 });
        break;
      case 'drag':
        gsap.to(ring, { width: 64, height: 64, duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { width: 4, height: 4, duration: 0.25 });
        break;
      case 'text':
        gsap.to(ring, { width: 4, height: 24, borderRadius: '2px', duration: 0.25 });
        break;
      default:
        gsap.to(ring, { width: 36, height: 36, borderRadius: '50%', duration: 0.25, ease: 'power2.out' });
        gsap.to(dot, { width: 8, height: 8, duration: 0.25 });
        break;
    }
  }, [cursorState, isTouch]);

  if (isTouch) {
    return (
      <CursorContext.Provider value={{ setCursorState }}>
        {children}
      </CursorContext.Provider>
    );
  }

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      <div
        ref={dotRef}
        className={styles.dot}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${styles[cursorState] || ''}`}
        aria-hidden="true"
      >
        {cursorState === 'video' && <span className={styles.playIcon}>▶</span>}
        {cursorState === 'drag' && <span className={styles.dragIcon}>⟷</span>}
      </div>
      {children}
    </CursorContext.Provider>
  );
}
