import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { useTransition } from '../components/transitions/TransitionContext';
import { useCursor } from '../components/cursor/Cursor';
import CtaFooter from '../components/sections/CtaFooter';

const categories = ['All', 'Ads Shoot', 'Reels', 'Short Films', 'Video Editing'];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const { setClickPos, setDestTitle } = useTransition();
  const { setCursorState } = useCursor();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleCardClick = (e, project) => {
    setClickPos({ x: e.clientX, y: e.clientY });
    setDestTitle(project.title);
    navigate(`/work/${project.id}`);
  };

  const catCount = (cat) =>
    cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--deep)' }}>
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          paddingTop: '8rem',
          paddingBottom: '6rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Page Header (FULL WIDTH) ─────────────────────────────────── */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            marginBottom: '4rem',
            boxSizing: 'border-box',
          }}
        >
          {/* eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'var(--yellow)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                fontWeight: 600,
              }}
            >
              Selected Portfolio // 2023 — 2025
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--cloud)',
              marginBottom: '1.25rem',
            }}
          >
            Selected <span style={{ color: 'var(--yellow)' }}>Works.</span>
          </h1>

          <p
            style={{
              maxWidth: '52rem',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'var(--teal)',
              opacity: 0.9,
              marginBottom: '2.5rem',
            }}
          >
            Specializing in Ads Shoot, Viral Reels Production, Narrative Short Films Making, and Precision Video Editing — crafted with cinema-grade optics right from Natham, Tamil Nadu.
          </p>

          {/* ── Filter Row ───────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75rem',
              borderTop: '1px solid rgba(107,149,153,0.2)',
              borderBottom: '1px solid rgba(107,149,153,0.2)',
              padding: '1.25rem 0',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                opacity: 0.7,
                marginRight: '0.5rem',
              }}
            >
              Filter by:
            </span>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: 'clamp(0.4rem, 1.5vw, 0.55rem) clamp(0.9rem, 2.5vw, 1.4rem)',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.68rem, 1.5vw, 0.75rem)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--yellow)' : 'rgba(27,67,72,0.6)',
                    color: isActive ? 'var(--deep)' : 'var(--cloud)',
                    border: isActive
                      ? '1px solid var(--yellow)'
                      : '1px solid rgba(107,149,153,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {cat} ({catCount(cat)})
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Project Grid (FULL VIEWPORT WIDTH) ───────────────────────── */}
        <div
          style={{
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 6rem)',
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
              gap: 'clamp(2rem, 3.5vw, 3rem)',
              width: '100%',
            }}
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <WorkCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={handleCardClick}
                  setCursorState={setCursorState}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Fullscreen CTA + Directory Footer */}
      <CtaFooter
        eyebrow="YOUR VISION // THE BIG SCREEN"
        titlePrefix="Ready to commission an"
        titleHighlight="award-winner?"
        subtext="Have an ambitious commercial ad, a viral social reel campaign, or a dramatic short film idea? Let our Natham directors bring it to life."
        buttonText="Commission Your Film"
        buttonIcon="📽️"
        buttonLink="/contact"
        auraColor="rgba(107,149,153,0.22)"
      />
    </div>
  );
}

/* ── Individual card component ───────────────────────────────────────── */
function WorkCard({ project, index, onClick, setCursorState }) {
  const [hovered, setHovered] = useState(false);
  const mediaUrl = project.thumbnail || project.image || '/media/project_1.jpg';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      onClick={(e) => onClick(e, project)}
      onMouseEnter={() => {
        setCursorState('link');
        setHovered(true);
      }}
      onMouseLeave={() => {
        setCursorState('default');
        setHovered(false);
      }}
      style={{
        position: 'relative',
        borderRadius: '1.4rem',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--mid)',
        border: hovered ? '1px solid var(--yellow)' : '1px solid rgba(107,149,153,0.22)',
        boxShadow: hovered
          ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(242,211,79,0.2)'
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* ── Thumbnail ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          backgroundColor: '#0c1e21',
        }}
      >
        {/* Real Cinema Still Photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Film grain / dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(16,40,44,0.95) 0%, rgba(16,40,44,0.3) 50%, rgba(16,40,44,0.6) 100%)',
            opacity: hovered ? 0.4 : 0.65,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* top meta row */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            right: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <span
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '100px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(16,40,44,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(242,211,79,0.35)',
              color: 'var(--yellow)',
              fontWeight: 700,
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--cloud)',
              backgroundColor: 'rgba(16,40,44,0.85)',
              backdropFilter: 'blur(8px)',
              padding: '0.35rem 0.8rem',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {project.year}
          </span>
        </div>

        {/* center hover cta */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--yellow)',
              color: 'var(--deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transform: hovered ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 8px 30px rgba(242,211,79,0.4)',
            }}
          >
            Explore
          </div>
        </div>

        {/* decorative corner line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: hovered
              ? 'linear-gradient(90deg, var(--yellow), transparent)'
              : 'transparent',
            transition: 'background 0.4s ease',
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Card Content ───────────────────────────────────────── */}
      <div
        style={{
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          backgroundColor: 'var(--deep)',
        }}
      >
        {/* client + arrow row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.6rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              fontWeight: 600,
            }}
          >
            Client: {project.client}
          </p>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: hovered ? '1px solid var(--yellow)' : '1px solid rgba(238,240,238,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: hovered ? 'var(--deep)' : 'var(--cloud)',
              backgroundColor: hovered ? 'var(--yellow)' : 'transparent',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            ↗
          </span>
        </div>

        {/* title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: hovered ? 'var(--yellow)' : 'var(--cloud)',
            marginBottom: '0.85rem',
            transition: 'color 0.3s ease',
          }}
        >
          {project.title}
        </h3>

        {/* excerpt */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.925rem',
            lineHeight: 1.65,
            color: 'rgba(238,240,238,0.7)',
            marginBottom: '1.35rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            paddingTop: '1.1rem',
            borderTop: '1px solid rgba(107,149,153,0.18)',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                padding: '0.3rem 0.75rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(107,149,153,0.12)',
                color: 'var(--teal)',
                fontWeight: 600,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
