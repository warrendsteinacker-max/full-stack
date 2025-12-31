import React from 'react';
import { useGlobalContext } from '../context/AppContext';

export const ShareTool = () => {
  const { generateShareLink } = useGlobalContext();

  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.05)', 
      padding: '20px', 
      borderRadius: '16px', 
      marginTop: '20px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Share Configuration</h4>
      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>
        Click below to copy a unique URL that saves all your current colors, speed, and animation settings.
      </p>
      <button 
        onClick={generateShareLink} 
        style={{ 
          width: '100%', 
          padding: '12px', 
          borderRadius: '8px', 
          background: '#fff', 
          color: '#000', 
          border: 'none',
          fontWeight: 'bold', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Generate & Copy Share URL
      </button>
    </div>
  );
};

export default ShareTool;