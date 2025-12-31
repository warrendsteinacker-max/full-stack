import React, { useState } from 'react';
import { useGlobalContext } from '../context/AppContext';

const CodeComparator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { reformatCSS } = useGlobalContext();

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>CSS Reformatting Comparison</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <textarea 
          placeholder="Paste Raw CSS"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          style={{ height: '120px', background: '#111', color: '#ff4d4d' }}
        />
        <div style={{ height: '120px', background: '#111', color: '#4dff88', padding: '10px', overflow: 'auto', border: '1px solid #333' }}>
          {output || "Output will appear here..."}
        </div>
      </div>
      <button onClick={() => setOutput(reformatCSS(input))} style={{ marginTop: '10px' }}>
        Apply Transformation
      </button>
    </div>
  );
};

export default CodeComparator;