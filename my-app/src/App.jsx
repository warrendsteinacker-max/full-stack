import React, { memo, useMemo } from 'react';
import './App.css';
import { useGlobalContext } from './context/AppContext';
import Navbar from './components/Navbar';
import LogFeed from './components/LogFeed';

const BackgroundGrid = memo(() => {
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
          <div key={box.id} className="flicker-box" style={{ animationDelay: box.delay, animationDuration: box.duration }} />
        ))}
      </div>
    </div>
  );
});

function App() {
  const { count, logAndCapture, isCapturing } = useGlobalContext();

  return (
    <div className="App">
      <Navbar />
      <BackgroundGrid />

      <div className="content-wrapper">
        <div className="dashboard-card">
          <h2>CSS Background Creator</h2>
          <p style={{ fontSize: '1.2rem', margin: '1rem 0', opacity: 0.8 }}>
            Training Progress: <span style={{ color: '#4c4e72', fontWeight: 'bold' }}>{count} Tasks</span>
          </p>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => logAndCapture("User initiated background training task")}
              disabled={isCapturing}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isCapturing ? '#222' : '#4c4e72',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {isCapturing ? "Capturing..." : "Log & Capture Task"}
            </button>
          </div>

          <LogFeed />
        </div>
      </div>
    </div>
  );
}

export default App;