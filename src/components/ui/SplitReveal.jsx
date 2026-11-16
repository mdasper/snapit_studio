import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * SplitReveal — Line/word-masked text reveal with GSAP
 */
export default function SplitReveal({
  as: Tag = 'h2',
  delay = 0,
  trigger = 'scroll',
  className = '',
  style = {},
  children,
}) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll('.split-char-wrap');
    if (!spans || spans.length === 0) return;

    const anim = gsap.fromTo(
      spans,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
        delay,
        paused: trigger === 'scroll',
      }
    );

    let st;
    if (trigger === 'scroll') {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => anim.play(),
      });
    } else {
      anim.play();
    }

    return () => {
      anim.kill();
      st?.kill();
    };
  }, [delay, trigger, prefersReduced, children]);

  if (typeof children !== 'string') {
    return (
      <Tag ref={containerRef} className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const words = children.split(' ');

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ ...style, display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: i < words.length - 1 ? '0.28em' : '0',
          }}
        >
          <span
            className="split-char-wrap"
            style={{
              display: 'inline-block',
              transform: prefersReduced ? 'none' : 'translateY(110%)',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
