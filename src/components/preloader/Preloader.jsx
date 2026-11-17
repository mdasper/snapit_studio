import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getLenis } from '../../hooks/useLenis';
import logoUrl from '../../assets/logo.png';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const slateWrapperRef = useRef(null);
  const clapperStickRef = useRef(null);
  const flashRef = useRef(null);
  const actionTextRef = useRef(null);
  const shockwaveRef = useRef(null);
  const [mounted, setMounted] = useState(true);

  // Realistic wooden film clapper snap sound synthesis
  const playClapSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const t = ctx.currentTime;
      // Resonant wood body strike
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(540, t);
      osc1.frequency.exponentialRampToValueAtTime(85, t + 0.08);
      gain1.gain.setValueAtTime(0.38, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.08);

      // Sharp mechanical crack
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(980, t);
      osc2.frequency.exponentialRampToValueAtTime(130, t + 0.04);
      gain2.gain.setValueAtTime(0.24, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.04);
    } catch (_) {}
  };

  useEffect(() => {
    // Clear flags so reload always plays
    try {
      sessionStorage.removeItem('preloader_lens_v2');
      sessionStorage.removeItem('preloader_done');
      sessionStorage.removeItem('preloader:done');
    } catch (_) {}

    const container = containerRef.current;
    const slate = slateWrapperRef.current;
    const stick = clapperStickRef.current;
    const flash = flashRef.current;
    const actionText = actionTextRef.current;
    const shockwave = shockwaveRef.current;

    if (!container || !slate || !stick) return;

    // Lock scroll during preloader
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';

    // Master Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        lenis?.start();
        document.body.style.overflow = '';
        setMounted(false);
        window.dispatchEvent(new CustomEvent('preloader:done'));
        onComplete?.();
      },
    });

    // Initial setup: Brand Teal Atmosphere
    gsap.set(container, { clipPath: 'circle(150% at 50% 50%)', opacity: 1 });
    gsap.set(flash, { opacity: 0 });
    gsap.set(shockwave, { scale: 0.2, opacity: 0 });
    gsap.set(slate, { scale: 0.88, y: 35, opacity: 0, rotateX: 6, perspective: 1000 });
    // Top clapper stick starts open at -28 degrees hinged from left
    gsap.set(stick, { rotation: -28, transformOrigin: '18px 36px' });
    gsap.set(actionText, { scale: 0.6, opacity: 0 });

    // ── Phase 1: Clapperboard Enters Smoothly (0.0s -> 0.75s) ──
    tl.to(slate, {
      scale: 1,
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out',
    }, 0.1);

    // ── Phase 2: Brief Hold (0.75s -> 1.2s) ──

    // ── Phase 3: THE CLAP! Clapper stick snaps shut (1.2s) ──
    tl.to(stick, {
      rotation: 0,
      duration: 0.15,
      ease: 'power4.in',
    }, 1.2);

    // Trigger clap audio sound at the exact impact moment
    tl.call(() => {
      playClapSound();
    }, null, 1.35);

    // Board reacts with a kinetic recoil bounce
    tl.to(slate, {
      y: 8,
      scale: 0.98,
      duration: 0.08,
      ease: 'power4.out',
    }, 1.35);

    tl.to(slate, {
      y: 0,
      scale: 1,
      duration: 0.22,
      ease: 'bounce.out',
    }, 1.43);

    // Expanding shockwave ring at hinge point
    tl.to(shockwave, {
      scale: 1.8,
      opacity: 0.8,
      duration: 0.1,
      ease: 'power2.out',
    }, 1.35);

    tl.to(shockwave, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 1.45);

    // "ACTION!" Badge pops up
    tl.to(actionText, {
      scale: 1,
      opacity: 1,
      duration: 0.22,
      ease: 'back.out(2)',
    }, 1.37);

    // White impact flare flash
    tl.to(flash, {
      opacity: 0.4,
      duration: 0.08,
      ease: 'power2.in',
    }, 1.35);

    tl.to(flash, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.out',
    }, 1.43);

    // ── Phase 4: Wipe Reveal to Website (1.9s -> 2.6s) ──
    tl.to(actionText, {
      opacity: 0,
      duration: 0.2,
    }, 1.85);

    tl.to(slate, {
      scale: 1.1,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    }, 1.9);

    tl.to(container, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.7,
      ease: 'expo.inOut',
    }, 1.9);

    return () => {
      tl.kill();
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        // Brand Logo Colors: Deep Studio Teal Gradient with Vignette
        background: 'radial-gradient(circle at 50% 45%, #1d464c 0%, #10282c 55%, #061113 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* ── Ambient Radial Halo ────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(107, 149, 153, 0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Subtitle Header: Studio Tagline ────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1rem, 3.5vh, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.4rem 0.6rem',
          padding: '0 1rem',
          fontFamily: "'DM Mono', monospace",
          fontSize: 'clamp(0.6rem, 1.8vw, 0.72rem)',
          fontWeight: 700,
          color: '#eef0ee',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.9,
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          textAlign: 'center',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#e63946',
            boxShadow: '0 0 10px #e63946',
            display: 'inline-block',
          }}
        />
        <span>SNAPIT STUDIOZ</span>
        <span style={{ color: '#ffffff', opacity: 0.5 }}>&bull;</span>
        <span>ADS SHOOT</span>
        <span style={{ color: '#ffffff', opacity: 0.5 }}>&bull;</span>
        <span>REELS</span>
        <span style={{ color: '#ffffff', opacity: 0.5 }}>&bull;</span>
        <span>SHORT FILMS</span>
      </div>

      {/* ── Center Stage: CLASSIC WHITE & BLACK FILM CLAPPERBOARD ───────── */}
      <div
        ref={slateWrapperRef}
        style={{
          position: 'relative',
          width: 'min(92vw, 380px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          filter:
            'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.08))',
        }}
      >
        {/* Kinetic Shockwave Ring on Hinge Impact */}
        <div
          ref={shockwaveRef}
          style={{
            position: 'absolute',
            left: '-10px',
            top: '30px',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            boxShadow: '0 0 20px #ffffff',
            pointerEvents: 'none',
            zIndex: 25,
          }}
        />

        {/* ── 1. Top Hinged Clapper Stick (CLASSIC WHITE & BLACK ZEBRA) ─── */}
        <div
          ref={clapperStickRef}
          style={{
            width: '100%',
            height: '44px',
            backgroundColor: '#071518',
            borderRadius: '8px 8px 0 0',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            boxShadow:
              '0 8px 24px rgba(0,0,0,0.6), inset 0 1.5px 0 rgba(255,255,255,0.4)',
            border: '2px solid #ffffff',
            borderBottom: 'none',
            zIndex: 10,
          }}
        >
          {/* Classic White & Black Diagonal Zebra Stripes */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'repeating-linear-gradient(45deg, #071518, #071518 22px, #ffffff 22px, #ffffff 44px)',
            }}
          />
          {/* Subtle 3D Glass Sheen Highlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Chrome/Silver Mechanical Hinge Bolt on Left */}
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              border: '2.5px solid #071518',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), inset 0 1px 3px rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Screw slot */}
            <div style={{ width: '6px', height: '1.5px', backgroundColor: '#071518' }} />
          </div>
          {/* Right Silver Lock Plate */}
          <div
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '12px',
              height: '6px',
              borderRadius: '2px',
              backgroundColor: '#e2e8f0',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
            }}
          />
        </div>

        {/* ── 2. Fixed Bottom Clapper Stick (CLASSIC WHITE & BLACK ZEBRA) ─ */}
        <div
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: '#071518',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #ffffff',
            borderTop: 'none',
            borderBottom: '2.5px solid #ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          }}
        >
          {/* Matching Reverse White & Black Zebra Stripes */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'repeating-linear-gradient(-45deg, #071518, #071518 22px, #ffffff 22px, #ffffff 44px)',
            }}
          />
          {/* 3D Reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Matching Silver Hinge Base */}
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              border: '2.5px solid #071518',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), inset 0 1px 3px rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '6px', height: '1.5px', backgroundColor: '#071518' }} />
          </div>
        </div>

        {/* ── 3. High-End Smoked Glass Acrylic Slate Body ───────────────── */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(7, 21, 24, 0.96)',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            padding: '1.4rem 1.3rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxShadow:
              'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Diagonal Glass Reflection Sheen */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background:
                'linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* Slate Header: Brand Title & Core Services */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              borderBottom: '1.5px solid rgba(255, 255, 255, 0.25)',
              paddingBottom: '1rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Silver & White Embossed Logo Medallion */}
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                backgroundColor: '#10282c',
                border: '2.5px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.8)',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <img
                src={logoUrl}
                alt="Snapit Studioz"
                style={{
                  width: 42,
                  height: 42,
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
                }}
              />
            </div>

            {/* Typography */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>SNAPIT </span>
                <span
                  style={{
                    color: '#f2d34f',
                    textShadow: '0 0 15px rgba(242, 211, 79, 0.5)',
                  }}
                >
                  STUDIOZ
                </span>
              </div>
              {/* Core Disciplines */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.64rem',
                  color: '#e2e8f0',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem',
                }}
              >
                ADS SHOOT &bull; REELS &bull; SHORT FILMS &bull; EDITING
              </div>
            </div>
          </div>

          {/* Slate Technical Matrix: SCENE, TAKE, FPS (Clean 3-Box Grid) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              backgroundColor: 'rgba(5, 15, 17, 0.8)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.7)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Scene Box */}
            <div
              style={{
                borderRight: '1.5px solid rgba(255, 255, 255, 0.35)',
                padding: '0.75rem 0.2rem',
                backgroundColor: 'rgba(27, 67, 72, 0.2)',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  color: '#6b9599',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                SCENE
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                01
              </div>
            </div>

            {/* Take Box (Highlighted in Gold/White) */}
            <div
              style={{
                borderRight: '1.5px solid rgba(255, 255, 255, 0.35)',
                padding: '0.75rem 0.2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  color: '#f2d34f',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                TAKE
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#f2d34f',
                  textShadow: '0 0 18px rgba(242, 211, 79, 0.7)',
                }}
              >
                01
              </div>
            </div>

            {/* FPS Box */}
            <div
              style={{
                padding: '0.75rem 0.2rem',
                backgroundColor: 'rgba(27, 67, 72, 0.2)',
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  color: '#6b9599',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                }}
              >
                FPS
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                24
              </div>
            </div>
          </div>
        </div>

        {/* ── "WELCOME!" Crisp White Luxury Badge on Clap ────────────────── */}
        <div
          ref={actionTextRef}
          style={{
            position: 'absolute',
            bottom: '-1.45rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            color: '#071518',
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 800,
            letterSpacing: '0.22em',
            padding: '0.45rem 1.8rem',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow:
              '0 8px 28px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3)',
            zIndex: 30,
          }}
        >
          WELCOME!
        </div>
      </div>

      {/* ── Crisp White Flash upon Clap Impact ───────────────────────── */}
      <div
        ref={flashRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </div>
  );
}
