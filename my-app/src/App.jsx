import React, { useState, memo, useMemo } from 'react';
import './App.css';

// MEMOIZED BACKGROUND: This will never re-render even if the App state changes
const BackgroundGrid = memo(() => {
  // Pre-calculate boxes once. We use 300 to ensure full screen coverage.
  const boxes = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * -10}s`,
      duration: `${6 + Math.random() * 4}s`,
    }));
  }, []);

  return (
    <div className="magic-bg-wrapper">
      <div className="grid-flicker-overlay">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="flicker-box"
            style={{
              animationDelay: box.delay,
              animationDuration: box.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
});

function App() {

  return (
    <div className="App">
      {/* This component is now hyper-optimized */}
      <BackgroundGrid />

      <div className="content-wrapper">
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          
        </h1>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Optimized Grid Active</p>

        <div className="dashboard-card">
          <h2>Welcome to my CSS Background Creator</h2>
          <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
            Actions: <span style={{ color: '#4c4e72', fontWeight: 'bold' }}>{count}</span>
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => navigate("/create")}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#4c4e72',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Navigate to Create Page
            </button>
 
  
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;