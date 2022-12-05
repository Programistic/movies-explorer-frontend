import { useLayoutEffect, useState } from 'react';

const WindowWidthMonitor = () => {
  const [windowWidth, setWindowsWidth] = useState({ width: 1280 });

  const handleWidth = () => {
    setWindowsWidth({ width: window.innerWidth });
  };

  useLayoutEffect(() => {
    handleWidth();
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  return windowWidth;
};

export default WindowWidthMonitor;
