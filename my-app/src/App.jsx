import React, { useMemo } from 'react';
import './App.css';

function App() {
  // Generate a random array of 150 boxes for the scattering effect
  const boxes = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      // Randomize delay so they don't move in sync
      delay: `${Math.random() * -20}s`,
      duration: `${15 + Math.random() * 10}s`,
    }));
  }, []);

  return (
    <div className="App">
      {/* BACKGROUND SCATTER LAYER */}
      <div className="magic-scatter-container">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="scatter-box"
            style={{
              top: box.top,
              left: box.left,
              animationDelay: box.delay,
              animationDuration: box.duration,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT LAYER */}
      <div className="content-wrapper">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome, Explorer</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Training Session Active</p>
        
        {/* Your Dashboard UI components go here */}
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3>Global State Dashboard</h3>
          <button style={{
            marginTop: '1rem',
            padding: '10px 20px',
            backgroundColor: '#4c4e72',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Log Interaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;