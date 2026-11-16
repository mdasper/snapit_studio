import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTransition } from './TransitionContext';

const variants = {
  initial: (custom) => ({
    clipPath: `circle(0% at ${custom.x}px ${custom.y}px)`,
    backgroundColor: '#f2d34f',
  }),
  animate: {
    clipPath: `circle(150% at 50% 50%)`,
    backgroundColor: '#1b4348',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: `circle(0% at 50% 50%)`,
    backgroundColor: '#f2d34f',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const { clickPos, destTitle } = useTransition();

  const custom = clickPos?.current ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'relative' }}
      >
        {/* Transition overlay panel */}
        <motion.div
          key={`overlay-${location.pathname}`}
          custom={custom}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 800,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {destTitle?.current && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#eef0ee',
                letterSpacing: '-0.02em',
              }}
            >
              {destTitle.current}
            </motion.p>
          )}
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}

