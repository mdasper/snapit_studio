import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SplitReveal from '../ui/SplitReveal';

gsap.registerPlugin(ScrollTrigger);

// 6 gallery items with different sizes and reveal directions
const GALLERY_ITEMS = [
  {
    image: '/media/bts_1.jpg',
    caption: 'Directing the Feature Lead',
    tag: 'ON SET // 35MM',
    size: 'large',
    revealDir: 'left',
    col: 1,
    aspect: '3/4',
  },
  {
    image: '/media/bts_2.jpg',
    caption: 'Cooke Anamorphic Rig Calibration',
    tag: 'OPTICS // 4K',
    size: 'medium',
    revealDir: 'top',
    col: 2,
    aspect: '4/3',
  },
  {
    image: '/media/bts_3.jpg',
    caption: 'Spatial Foley & Analog Mix Session',
    tag: 'STUDIO // ATMOS',
    size: 'medium',
    revealDir: 'right',
    col: 3,
    aspect: '1/1',
  },
  {
    image: '/media/bts_4.jpg',
    caption: 'Heritage Location Lighting Setup',
    tag: 'TAMIL NADU // 2024',
    size: 'medium',
    revealDir: 'bottom',
    col: 1,
    aspect: '4/3',
  },
  {
    image: '/media/bts_5.jpg',
    caption: 'High-Speed Gimbal Tracking Run',
    tag: 'ACTION // FX6 RIG',
    size: 'large',
    revealDir: 'right',
    col: 2,
    aspect: '3/4',
  },
  {
    image: '/media/bts_6.jpg',
    caption: 'ACES Color Space Suite Final Grade',
    tag: 'DAVINCI // MASTER',
    size: 'medium',
    revealDir: 'left',
    col: 3,
    aspect: '4/5',
  },
];

function getClipStart(dir) {
  switch (dir) {
    case 'left': return 'inset(0 100% 0 0)';
    case 'right': return 'inset(0 0 0 100%)';
    case 'top': return 'inset(100% 0 0 0)';
    case 'bottom': return 'inset(0 0 100% 0)';
    default: return 'inset(0 100% 0 0)';
  }
}

function GalleryItem({ item, index }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { clipPath: getClipStart(item.revealDir) });
      gsap.set(innerRef.current, { scale: 1.2 });

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(wrapRef.current, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.9,
            ease: 'power3.inOut',
            delay: (index % 3) * 0.08,
          });
          gsap.to(innerRef.current, {
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: (index % 3) * 0.08,
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, [prefersReduced, item.revealDir, index]);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        aspectRatio: item.aspect,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        clipPath: prefersReduced ? 'none' : getClipStart(item.revealDir),
        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        backgroundColor: 'var(--mid)',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: prefersReduced ? 'scale(1)' : 'scale(1.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          position: 'relative',
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(16,40,44,0.95) 0%, rgba(16,40,44,0.3) 60%, transparent 100%)',
          }}
        />

        {/* Caption */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: 'var(--yellow)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.25rem',
              fontWeight: 700,
            }}
          >
            {item.tag}
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'var(--cloud)',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Column parallax speeds on Desktop only
  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const cols = [
      { ref: col1Ref, speed: -25 },
      { ref: col2Ref, speed: -50 },
      { ref: col3Ref, speed: -75 },
    ];

    const ctx = gsap.context(() => {
      cols.forEach(({ ref, speed }) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (!ref.current) return;
            gsap.set(ref.current, { y: self.progress * speed });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, isMobile]);

  const col1Items = GALLERY_ITEMS.filter((i) => i.col === 1);
  const col2Items = GALLERY_ITEMS.filter((i) => i.col === 2);
  const col3Items = GALLERY_ITEMS.filter((i) => i.col === 3);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        background: 'var(--deep)',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 4vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <SplitReveal
          as="h2"
          trigger="scroll"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: 'var(--cloud)',
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Behind The Frame
        </SplitReveal>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--yellow)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          BTS Gallery // Natham
        </span>
      </div>

      {/* Grid: 3 columns on Desktop, clean responsive 1-column layout on Mobile */}
      {!isMobile ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2vw, 2rem)',
            alignItems: 'start',
          }}
        >
          <div ref={col1Ref} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {col1Items.map((item, i) => (
              <GalleryItem key={i} item={item} index={i * 3} />
            ))}
          </div>
          <div ref={col2Ref} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
            {col2Items.map((item, i) => (
              <GalleryItem key={i} item={item} index={i * 3 + 1} />
            ))}
          </div>
          <div ref={col3Ref} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '6rem' }}>
            {col3Items.map((item, i) => (
              <GalleryItem key={i} item={item} index={i * 3 + 2} />
            ))}
          </div>
        </div>
      ) : (
        /* Mobile: Crisp single-column card stack with full visibility */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
