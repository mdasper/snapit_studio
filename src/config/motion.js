// Animation configuration for SNAPIT STUDIOZ
export const MOTION = {
  duration: {
    fast: 0.3,
    base: 0.6,
    slow: 1.0,
    xslow: 1.4,
  },
  ease: {
    out: 'power3.out',
    inOut: 'power3.inOut',
    expo: 'expo.out',
    back: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.4)',
    iris: 'power4.inOut',
  },
  stagger: {
    fast: 0.05,
    base: 0.08,
    slow: 0.12,
  },
  scroll: {
    start: 'top 85%',
    end: 'bottom 15%',
    scrub: 1.5,
  },
  preloader: {
    duration: 2.4,
    counterDuration: 2.0,
    irisduration: 1.1,
  },
};

export default MOTION;

