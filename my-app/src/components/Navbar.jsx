import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      zIndex: 100
    }}>
      <div style={{ color: 'white', fontWeight: 'bold' }}>BG_CREATOR</div>
      <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.7)' }}>
        <span>Home</span>
        <span>Gallery</span>
      </div>
    </nav>
  );
};

export default Navbar;