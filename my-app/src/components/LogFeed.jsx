import React from 'react';
import { useGlobalContext } from '../context/AppContext';

const LogFeed = () => {
  const { logs } = useGlobalContext();

  return (
    <div style={{ marginTop: '2rem', width: '100%', maxWidth: '600px' }}>
      <h3 style={{ color: 'white', marginBottom: '1rem' }}>Training Logs</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {logs.map(log => (
          <div key={log.id} style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <img src={log.screenshot} alt="cap" style={{ width: '60px', borderRadius: '4px' }} />
            <div style={{ color: 'white', fontSize: '0.8rem' }}>
              <strong>{log.timestamp}</strong> - {log.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogFeed;