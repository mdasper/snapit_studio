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
        /* Mobile interactive luxury carousel */
        <div
          style={{ padding: '1.25rem 1rem 3rem', overflow: 'hidden' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex}rem))`,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                onClick={() => navigate(`/work/${project.id}`)}
                style={{
                  flexShrink: 0,
                  width: '100%',
                  height: 'clamp(420px, 65vh, 520px)',
                  borderRadius: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                  backgroundColor: 'var(--mid)',
                }}
              >
                {/* Real High-Resolution Thumbnail Image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* Cinematic Gradient Vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(16,40,44,0.98) 0%, rgba(16,40,44,0.4) 50%, rgba(16,40,44,0.7) 100%)',
                  }}
                />

                {/* Index badge top right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    color: 'var(--yellow)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    background: 'rgba(16, 40, 44, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(242, 211, 79, 0.3)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>

                {/* Bottom Card Content */}
                <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.5rem', right: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      color: 'var(--yellow)',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.35rem',
                      fontWeight: 700,
                    }}
                  >
                    {project.category} &bull; {project.year}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.6rem',
                      color: 'var(--cloud)',
                      margin: '0 0 0.3rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--teal)',
                      margin: '0 0 0.8rem',
                    }}
                  >
                    Client: {project.client}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--yellow)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    View Project &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls on Mobile: Dots + Next/Prev Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.25rem',
              padding: '0 0.5rem',
            }}
          >
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous Project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid rgba(107, 149, 153, 0.3)',
                background: 'rgba(27, 67, 72, 0.4)',
                color: 'var(--cloud)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: activeIndex === 0 ? 0.3 : 1,
              }}
            >
              &larr;
            </button>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  style={{
                    width: i === activeIndex ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: i === activeIndex ? 'var(--yellow)' : 'rgba(238,240,238,0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1))}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next Project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid rgba(107, 149, 153, 0.3)',
                background: 'rgba(27, 67, 72, 0.4)',
                color: 'var(--cloud)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === projects.length - 1 ? 'not-allowed' : 'pointer',
                opacity: activeIndex === projects.length - 1 ? 0.3 : 1,
              }}
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

