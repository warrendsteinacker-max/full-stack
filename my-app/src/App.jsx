import React from 'react';
import './App.css';
import { useGlobalContext } from './context/AppContext';
import BackgroundGrid from './components/BackgroundGrid';
import CodeComparator from './components/CodeComparator';
import { StyleGallery } from './components/StyleGallery';
import { ShareTool } from './components/ShareTool';

function App() {
  const { config, setConfig, saveToGallery } = useGlobalContext();

  return (
    <div className="App">
      <BackgroundGrid settings={config} />
      
      <div className="content-wrapper">
        <div className="dashboard-card">
          <h1>Background Studio</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label>Theme Name</label>
              <input type="text" value={config.themeName} onChange={(e) => setConfig({...config, themeName: e.target.value})} style={{width: '100%'}} />
            </div>
            <div>
              <label>Complexity Mode</label>
              <select value={config.complexity} onChange={(e) => setConfig({...config, complexity: e.target.value})} style={{width: '100%'}}>
                <option value="pulse">Pulse</option>
                <option value="scatter">Scatter</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <label>Primary Color <input type="color" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} /></label>
            <label>BG Color <input type="color" value={config.secondaryColor} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} /></label>
          </div>

          <StyleGallery />
          <ShareTool />
          <CodeComparator />

          <button onClick={saveToGallery} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>
            Save Current to Gallery
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;