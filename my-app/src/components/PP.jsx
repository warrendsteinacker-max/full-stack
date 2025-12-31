import React, { useReducer, useEffect } from 'react';

const rippleReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-20);
    case 'REMOVE_RIPPLE':
      return state.filter((r) => r.id !== action.payload);
    default:
      return state;
  }
};

export default function PP() {
  const [ripples, dispatch] = useReducer(rippleReducer, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const id = Date.now();
      const newRipple = { id, x: e.clientX, y: e.clientY };

      dispatch({ type: 'ADD_RIPPLE', payload: newRipple });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_RIPPLE', payload: id });
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* 1. INLINE CSS VIA STYLE TAG */}
      <style>
        {`
          @keyframes ripple-effect {
            0% { width: 0px; height: 0px; opacity: 0.5; }
            100% { width: 100px; height: 100px; opacity: 0; }
          }
          .ripple-style {
            position: absolute;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple-effect 1s ease-out forwards;
          }
        `}
      </style>

      {/* 2. CONTAINER WITH INLINE STYLE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple-style"
            style={{ 
              left: ripple.x, 
              top: ripple.y 
            }}
          />
        ))}
      </div>
    </>
  );
}

