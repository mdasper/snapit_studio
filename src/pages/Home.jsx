import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import IntroStatement from '../components/sections/IntroStatement';
import ShowreelExpand from '../components/sections/ShowreelExpand';
import FeaturedWork from '../components/sections/FeaturedWork';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Statistics from '../components/sections/Statistics';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import CtaFooter from '../components/sections/CtaFooter';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Background color shift triggers across sections
      const sections = [
        { selector: '#intro-section', bg: '#1b4348' },      // --mid
        { selector: '#showreel-section', bg: '#10282c' },   // --deep
        { selector: '#services-section', bg: '#10282c' },   // --deep
        { selector: '#stats-section', bg: '#1b4348' },      // --mid
        { selector: '#gallery-section', bg: '#10282c' },    // --deep
      ];

      sections.forEach(({ selector, bg }) => {
        const el = document.querySelector(selector);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              gsap.to(document.body, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' });
            },
            onLeaveBack: () => {
              gsap.to(document.body, { backgroundColor: '#10282c', duration: 0.8, ease: 'power2.inOut' });
            },
          });
        }
      });
    }, mainRef);

    return () => {
      ctx.revert();
      document.body.style.backgroundColor = '';
    };
  }, [prefersReduced]);

  return (
    <main ref={mainRef} id="main-content" className="w-full min-h-screen relative overflow-x-hidden">
      {/* 1. Hero */}
      <section id="hero-section">
        <Hero />
      </section>

      {/* 2. Infinite Marquee Strip */}
      <section id="marquee-section">
        <Marquee />
      </section>

      {/* 3. Word-by-word Scrub Intro */}
      <section id="intro-section">
        <IntroStatement />
      </section>

      {/* 4. Showreel Pinned Expand */}
      <section id="showreel-section">
        <ShowreelExpand />
      </section>

      {/* 5. Featured Work Horizontal Scroll */}
      <section id="featured-section">
        <FeaturedWork />
      </section>

      {/* 6. Oversized Services Rows */}
      <section id="services-section">
        <Services />
      </section>

      {/* 7. Stacked Process Cards */}
      <section id="process-section">
        <Process />
      </section>

      {/* 8. Slot-Machine / Counter Stats */}
      <section id="stats-section">
        <Statistics />
      </section>

      {/* 9. Behind-The-Scenes Gallery */}
      <section id="gallery-section">
        <Gallery />
      </section>

      {/* 10. Draggable Inertia Testimonials */}
      <section id="testimonials-section">
        <Testimonials />
      </section>

      {/* 11. Clapper CTA + Pinned Footer */}
      <section id="footer-section">
        <CtaFooter
          eyebrow="READY TO DIRECT YOUR STORY?"
          titlePrefix="Let's make something"
          titleHighlight="remarkable."
          subtext="From high-concept commercial ads and viral reels to cinematic short films — our Natham studio turns ambitious ideas into cinema."
          buttonText="Start A Project"
          buttonIcon="🎬"
          buttonLink="/contact"
          auraColor="rgba(242,211,79,0.15)"
        />
      </section>
    </main>
  );
}
