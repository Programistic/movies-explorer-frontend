import { useLayoutEffect, useState } from 'react';

function WindowWidthMonitor() {
  const [windowWidth, setWindowsWidth] = useState({ width: 0 });

  const handleWidth = () => {
    setWindowsWidth({ width: window.innerWidth });
  };

  useLayoutEffect(() => {
    handleWidth();
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  return windowWidth;
}

export default WindowWidthMonitor;
