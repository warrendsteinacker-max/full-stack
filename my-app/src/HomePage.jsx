import React from 'react';
import { useGlobalContext } from './AppContext';
import './HomePage.css';

const HomePage = () => {
  const { count, user, increment, resetCount } = useGlobalContext();

  return (
    <div className="magicpattern">
      <div className="content-container">
        <header className="home-header">
          <h1>Welcome, {user.name}</h1>
          <p>Training Session Active</p>
        </header>

        <main className="card">
          <h2>Global State Dashboard</h2>
          <div className="stat-row">
            <span>Action Count:</span>
            <span className="count-badge">{count}</span>
          </div>
          
          <div className="button-group">
            <button className="btn-primary" onClick={increment}>
              Log Interaction
            </button>
            <button className="btn-secondary" onClick={resetCount}>
              Reset
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;