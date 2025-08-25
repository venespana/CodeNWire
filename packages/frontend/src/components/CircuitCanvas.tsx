import { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Group } from 'react-konva';

import { ESP32Renderer } from '@/presentation/components/electronics';
import { ESP32Entity } from '@/domain/entities/ESP32';
import { useCircuitStore, useUIStore } from '../presentation/stores';
import { ComponentType } from '@/types';

const CircuitCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { circuit, selectComponent } = useCircuitStore();
  const {
    canvasSize,
    setCanvasSize,
    gridVisible,
    zoom,
    panOffset
  } = useUIStore();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setCanvasSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setCanvasSize]);


  // Grid pattern
  const gridSize = 20;
  const gridLines = [];

  if (gridVisible) {
    // Vertical lines
    for (let i = 0; i <= canvasSize.width; i += gridSize) {
      gridLines.push(
        <Rect
          key={`v-${i}`}
          x={i}
          y={0}
          width={1}
          height={canvasSize.height}
          fill="rgba(255, 255, 255, 0.1)"
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i <= canvasSize.height; i += gridSize) {
      gridLines.push(
        <Rect
          key={`h-${i}`}
          x={0}
          y={i}
          width={canvasSize.width}
          height={1}
          fill="rgba(255, 255, 255, 0.1)"
        />
      );
    }
  }

  const renderComponent = (component: any) => {
    switch (component.type) {
      case ComponentType.ESP32:
        // Create ESP32 entity for rendering
        const esp32Entity = new ESP32Entity(component.id);
        return (
          <ESP32Renderer
            key={component.id}
            component={esp32Entity}
            x={component.position.x}
            y={component.position.y}
            onClick={() => selectComponent(component)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="flex-1 bg-gray-800 relative overflow-hidden">
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        scaleX={zoom}
        scaleY={zoom}
        x={panOffset.x}
        y={panOffset.y}
      >
        <Layer>
          {/* Grid */}
          {gridVisible && <Group>{gridLines}</Group>}

          {/* Circuit Components */}
          {circuit.components.map(renderComponent)}

        </Layer>
      </Stage>
    </div>
  );
};

export default CircuitCanvas;
