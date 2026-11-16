import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCursor } from '../cursor/Cursor';

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelExpand() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const videoFrameRef = useRef(null);
  const labelLeftRef = useRef(null);
  const labelRightRef = useRef(null);
  const taglineRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [irisOut, setIrisOut] = useState(false);
  const prefersReduced = useReducedMotion();
  const { setCursorState } = useCursor();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(videoFrameRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        ease: 'none',
      }, 0)
        .to(labelLeftRef.current, { x: '-120%', opacity: 0, ease: 'none' }, 0)
        .to(labelRightRef.current, { x: '120%', opacity: 0, ease: 'none' }, 0)
        .to(taglineRef.current, { opacity: 0, y: 20, ease: 'none' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setIrisOut(false);
    setCursorState('default');
  }, [setCursorState]);

  const closeModal = useCallback(() => {
    setIrisOut(true);
    setTimeout(() => {
      setModalOpen(false);
      setIrisOut(false);
    }, 700);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      style={{ background: 'var(--deep)', position: 'relative' }}
    >
      <div
        ref={pinWrapRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '40vw',
            marginBottom: '1rem',
            minWidth: '300px',
          }}
        >
          <span
            ref={labelLeftRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: 'var(--teal)',
              textTransform: 'uppercase',
            }}
          >
            Reel
          </span>
          <span
            ref={labelRightRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--cloud)',
              opacity: 0.5,
            }}
          >
            2024
          </span>
        </div>

        {/* Video frame */}
        <div
          ref={videoFrameRef}
          data-cursor="video"
          onClick={openModal}
          onMouseEnter={() => setCursorState('video')}
          onMouseLeave={() => setCursorState('default')}
          style={{
            width: '40vw',
            minWidth: '300px',
            height: '50vh',
            borderRadius: '2rem',
            overflow: 'hidden',
            backgroundImage: 'url(/media/reel_poster.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            transition: 'box-shadow 0.3s ease',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Subtle cinematic gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(16,40,44,0.3) 0%, rgba(16,40,44,0.85) 100%)',
            }}
          />
          {/* Play overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '1.5px solid rgba(242,211,79,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                background: 'rgba(16,40,44,0.4)',
              }}
            >
              <span style={{ color: 'var(--yellow)', fontSize: '1.4rem', marginLeft: '4px' }}>▶</span>
            </div>
          </div>
        </div>

        {/* Tagline below */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'rgba(238,240,238,0.5)',
            marginTop: '1.5rem',
            letterSpacing: '0.08em',
          }}
        >
          Our craft in motion — scroll to expand
        </p>
      </div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: irisOut ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
            transition: 'clip-path 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
            animation: !irisOut ? 'irisOpen 0.65s cubic-bezier(0.76, 0, 0.24, 1) forwards' : 'none',
          }}
        >
          <video
            src="/showreel.mp4"
            autoPlay
            controls
            style={{ width: '90vw', maxHeight: '90vh', borderRadius: '1rem' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Fallback placeholder */}
          <div
            style={{
              position: 'absolute',
              width: '90vw',
              maxHeight: '90vh',
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #10282c, #1b4348)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ color: 'var(--teal)', fontSize: '1rem', opacity: 0.5 }}>Showreel placeholder</span>
          </div>
          <button
            onClick={closeModal}
            aria-label="Close reel"
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: '1.5px solid rgba(238,240,238,0.4)',
              borderRadius: '50%',
              width: '52px',
              height: '52px',
              color: 'var(--cloud)',
              fontSize: '1.3rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.color = 'var(--yellow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(238,240,238,0.4)'; e.currentTarget.style.color = 'var(--cloud)'; }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @keyframes irisOpen {
          from { clip-path: circle(0% at 50% 50%); }
          to { clip-path: circle(150% at 50% 50%); }
        }
      `}</style>
    </section>
  );
}

