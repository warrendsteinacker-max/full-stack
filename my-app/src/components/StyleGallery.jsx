import React from 'react';
import { useGlobalContext } from '../context/AppContext';

export const StyleGallery = () => {
  const { userStyles, setConfig } = useGlobalContext();

  return (
    <div style={{ margin: '20px 0' }}>
      <label style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Gallery Presets
      </label>
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginTop: '10px', 
        overflowX: 'auto', 
        paddingBottom: '10px' 
      }}>
        {userStyles.map((s, i) => (
          <button 
            key={i} 
            onClick={() => setConfig(s)} 
            style={{ 
              background: s.primaryColor, 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              color: '#000', 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
          >
            {s.themeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleGallery;