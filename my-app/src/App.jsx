import React, { useMemo, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  // Calculate grid size based on window dimensions
  useEffect(() => {
    const calculateGrid = () => {
      const cols = Math.ceil(window.innerWidth / 52); // 50px width + 2px gap
      const rws = Math.ceil(window.innerHeight / 52);
      setColumns(cols);
      setRows(rws);
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  const totalSquares = columns * rows;

  return (
    <div className="App">
      {/* STATIONARY GRID BACKGROUND */}
      <div className="grid-container">
        {Array.from({ length: totalSquares }).map((_, i) => (
          <div
            key={i}
            className="grid-square"
            style={{
              // Random delay so they don't pulse at the same time
              animationDelay: `${Math.random() * -10}s`,
              // Random duration for organic feeling flickering
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* OVERLAY CONTENT */}
      <div className="content-wrapper">
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800' }}>Welcome, Explorer</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Training Session Active</p>
        
        <div className="dashboard-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Global State Dashboard</h2>
          <button style={{
            padding: '12px 30px',
            fontSize: '1rem',
            backgroundColor: '#4c4e72',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            Log Interaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;