import { useRef, useEffect, useState, useCallback } from 'react';

import type { Size } from '@/types';

export const useCanvas = () => {
  const [stageSize, setStageSize] = useState<Size>({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setStageSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return {
    stageSize,
    containerRef,
    updateSize,
  };
};
