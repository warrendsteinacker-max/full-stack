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
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* This component is now hyper-optimized */}
      <BackgroundGrid />

      <div className="content-wrapper">
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Welcome, Explorer
        </h1>
        <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Optimized Grid Active</p>

        <div className="dashboard-card">
          <h2>Global State Dashboard</h2>
          <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
            Actions: <span style={{ color: '#4c4e72', fontWeight: 'bold' }}>{count}</span>
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setCount(prev => prev + 1)}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#4c4e72',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Log Interaction
            </button>
            <button 
              onClick={() => setCount(0)}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid #4c4e72',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;