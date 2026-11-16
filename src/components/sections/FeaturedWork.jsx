import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTransition } from '../transitions/TransitionContext';
import { useCursor } from '../cursor/Cursor';
import { projects } from '../../data/projects';
import SplitReveal from '../ui/SplitReveal';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index, total, isActive }) {
  const navigate = useNavigate();
  const { setClickPos, setDestTitle } = useTransition();
  const { setCursorState } = useCursor();
  const cardRef = useRef(null);

  const handleClick = (e) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setDestTitle(project.title);
    navigate(`/work/${project.id}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={() => setCursorState('link')}
      onMouseLeave={() => setCursorState('default')}
      data-cursor="link"
      style={{
        flexShrink: 0,
        width: '420px',
        height: '560px',
        borderRadius: '1.2rem',
        overflow: 'hidden',
        cursor: 'none',
        position: 'relative',
        background: project.gradient,
        transform: isActive ? 'scale(1)' : 'scale(0.9)',
        filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        boxShadow: isActive ? '0 24px 60px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Inner image thumbnail with parallax zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${project.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(16,40,44,0.95) 0%, rgba(16,40,44,0.3) 50%, rgba(16,40,44,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: 'var(--yellow)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          {project.category} · {project.year}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.6rem',
            color: 'var(--cloud)',
            margin: '0 0 0.4rem',
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--teal)',
            margin: 0,
          }}
        >
          {project.client}
        </p>
      </div>

      {/* Number */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: 'rgba(238,240,238,0.3)',
          letterSpacing: '0.1em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef({ isDragging: false, startX: 0, currentIndex: 0 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth + window.innerWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const x = -self.progress * totalWidth;
          gsap.set(track, { x });

          // Update active card
          const cardWidth = 420 + 32; // card + gap
          const idx = Math.round(Math.abs(x) / cardWidth);
          const clamped = Math.min(idx, projects.length - 1);
          setActiveIndex(clamped);

          // Update counter & progress bar
          if (counterRef.current) {
            counterRef.current.textContent = `${String(clamped + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleY(${self.progress})`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, isMobile]);

  // Mobile swipe carousel
  const handleTouchStart = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.changedTouches[0].clientX - dragRef.current.startX;
    if (Math.abs(dx) > 50) {
      const dir = dx < 0 ? 1 : -1;
      setActiveIndex((prev) => Math.min(Math.max(prev + dir, 0), projects.length - 1));
    }
    dragRef.current.isDragging = false;
  };

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      style={{
        background: 'var(--deep)',
        position: 'relative',
        overflow: isMobile ? 'visible' : 'hidden',
      }}
    >
      {/* Section header */}
      <div
        style={{
          position: isMobile ? 'relative' : 'absolute',
          top: isMobile ? 'auto' : '2.5rem',
          left: isMobile ? 'auto' : '4rem',
          padding: isMobile ? '3rem 1.5rem 1rem' : '0',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <SplitReveal
          as="h2"
          trigger="scroll"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--cloud)',
            margin: 0,
          }}
        >
          Featured Work
        </SplitReveal>
      </div>

      {/* Desktop horizontal scroll */}
      {!isMobile ? (
        <div
          style={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '2rem',
              paddingLeft: '8rem',
              paddingRight: '4rem',
              alignItems: 'center',
              willChange: 'transform',
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
                isActive={i === activeIndex}
              />
            ))}
          </div>

          {/* Vertical counter */}
          <div
            style={{
              position: 'absolute',
              right: '2.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              zIndex: 5,
            }}
          >
            <span
              ref={counterRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.8rem',
                color: 'var(--teal)',
                writingMode: 'vertical-rl',
                letterSpacing: '0.1em',
              }}
            >
              01 / 08
            </span>
            <div
              style={{
                width: '2px',
                height: '80px',
                background: 'rgba(107,149,153,0.3)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <div
                ref={progressBarRef}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--yellow)',
                  transform: 'scaleY(0)',
                  transformOrigin: 'top',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Mobile carousel */
        <div
          style={{ padding: '1.5rem', overflow: 'hidden' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex}rem))`,
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{
                  flexShrink: 0,
                  width: '100%',
                  height: '480px',
                  borderRadius: '1.2rem',
                  background: project.gradient,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,40,44,0.95), transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--yellow)', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--cloud)', margin: 0 }}>
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === activeIndex ? 'var(--yellow)' : 'rgba(238,240,238,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

