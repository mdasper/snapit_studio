import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TransitionContext } from '../components/transitions/TransitionContext';
import Cursor from '../components/cursor/Cursor';
import FilmGrain from '../components/ui/FilmGrain';
import ScrollProgress from '../components/ui/ScrollProgress';
import Navbar from '../components/nav/Navbar';
import Preloader from '../components/preloader/Preloader';
import { useLenis } from '../hooks/useLenis';

export default function RootLayout() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <TransitionContext>
      {/* Overlay UI */}
      <FilmGrain />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Page content */}
      <div id="content-wrapper" style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
        <Outlet />
      </div>
    </TransitionContext>
  );
}
