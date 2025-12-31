import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [config, setConfig] = useState({
    themeName: 'Default Deep',
    primaryColor: '#4c4e72',
    secondaryColor: '#000336',
    speed: 7,
    boxCount: 400,
    complexity: 'pulse'
  });

  const [userStyles, setUserStyles] = useState([
    { themeName: 'Cyberpunk', primaryColor: '#ff00ff', secondaryColor: '#000000', speed: 3, complexity: 'scatter', boxCount: 400 },
    { themeName: 'Matrix', primaryColor: '#00ff41', secondaryColor: '#000000', speed: 5, complexity: 'pulse', boxCount: 400 }
  ]);

  const [logs, setLogs] = useState([]);

  // Load from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('config');
    if (encoded) {
      try { setConfig(JSON.parse(atob(encoded))); } catch (e) { console.error("URL Load Failed"); }
    }
  }, []);

  const saveToGallery = () => {
    setUserStyles(prev => [...prev, { ...config, id: Date.now() }]);
  };

  const reformatCSS = (raw) => {
    return raw
      .replace(/background-color:\s*[^;]+;/g, `background-color: var(--box-color);`)
      .replace(/animation-duration:\s*[^;]+;/g, `animation-duration: var(--anim-speed);`);
  };

  const generateShareLink = () => {
    const encoded = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?config=${encoded}`;
    navigator.clipboard.writeText(url);
    alert("URL Copied!");
  };

  return (
    <AppContext.Provider value={{ 
      config, setConfig, userStyles, saveToGallery, reformatCSS, generateShareLink 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);