import React, { memo, useMemo } from 'react';

const BackgroundGrid = memo(({ settings }) => {
  const boxes = useMemo(() => {
    return Array.from({ length: settings.boxCount }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * -settings.speed}s`,
      duration: `${settings.speed * 0.8 + Math.random() * (settings.speed * 0.4)}s`,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    }));
  }, [settings.boxCount, settings.speed]);

  return (
    <div className="magic-bg-wrapper" style={{ 
      backgroundColor: settings.secondaryColor,
      '--box-color': settings.primaryColor,
      '--anim-speed': `${settings.speed}s`
    }}>
      <div className="grid-flicker-overlay">
        {boxes.map((box) => (
          <div 
            key={box.id} 
            className={`flicker-box ${settings.complexity}`} 
            style={{ 
              animationDelay: box.delay, 
              animationDuration: box.duration,
              '--dx': `${box.x}px`,
              '--dy': `${box.y}px`
            }} 
          />
        ))}
      </div>
    </div>
  );
});

export default BackgroundGrid;