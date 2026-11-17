import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent ScrollTrigger from jumping when mobile URL bar hides/shows
ScrollTrigger.config({ ignoreMobileResize: true });

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    // Detect mobile touch devices
    const isTouch =
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.innerWidth < 768;

    // On mobile touch devices, use native hardware-accelerated momentum scrolling.
    // Lenis syncTouch on mobile is notorious for causing blank tile rendering and stutter.
    if (isTouch) {
      lenisInstance = null;
      const handleNativeScroll = () => {
        ScrollTrigger.update();
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    // On desktop, initialize smooth mousewheel Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 0,
      syncTouch: false,
      infinite: false,
    });

    lenisInstance = lenis;

    const onTick = (time) => {
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', onScroll);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, []);
}
