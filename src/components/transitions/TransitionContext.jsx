import React, { createContext, useContext, useRef } from 'react';

const TransitionCtx = createContext({
  clickPos: { x: 0, y: 0 },
  destTitle: '',
  setClickPos: () => {},
  setDestTitle: () => {},
});

export function TransitionContext({ children }) {
  const clickPos = useRef({ x: 0, y: 0 });
  const destTitle = useRef('');

  const setClickPos = (pos) => {
    clickPos.current = pos;
  };
  const setDestTitle = (title) => {
    destTitle.current = title;
  };

  return (
    <TransitionCtx.Provider
      value={{
        clickPos,
        destTitle,
        setClickPos,
        setDestTitle,
      }}
    >
      {children}
    </TransitionCtx.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionCtx);
}

export default TransitionContext;

