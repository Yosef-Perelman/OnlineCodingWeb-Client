// In a new file, e.g., useResizeObserverErrorHandler.js
import { useEffect } from 'react';

function useResizeObserverErrorHandler() {
  useEffect(() => {
    const handler = (event) => {
      if (event.message.includes('ResizeObserver')) {
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);
}

export default useResizeObserverErrorHandler;