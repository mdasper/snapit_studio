import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import App from './App';
import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// ScrollTrigger defaults
ScrollTrigger.defaults({
  markers: false,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
