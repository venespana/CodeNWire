import React from 'react';
import { Group, Circle, Rect } from 'react-konva';
import type { LEDComponent } from '@/domain/entities/ElectronicComponent';

interface LEDRendererProps {
  component: LEDComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const LEDRenderer: React.FC<LEDRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { color, isOn, brightness, rgbColor } = properties;

  const getBaseColor = () => {
    switch (color) {
      case 'red': return '#ff0000';
      case 'green': return '#00ff00';
      case 'blue': return '#0000ff';
      case 'yellow': return '#ffff00';
      case 'white': return '#ffffff';
      case 'rgb': return rgbColor;
      default: return '#ff0000';
    }
  };

  const getLEDColor = () => {
    if (!isOn) return '#333333';
    const baseColor = getBaseColor();
    const alpha = brightness;
    return baseColor + Math.round(alpha * 255).toString(16).padStart(2, '0');
  };

  const getGlowColor = () => {
    if (!isOn) return 'transparent';
    return getBaseColor();
  };

  return (
    <Group
      x={position.x}
      y={position.y}
      rotation={rotation}
      draggable={draggable}
      onClick={onClick}
    >
      {/* LED Body */}
      <Circle
        x={0}
        y={0}
        radius={8}
        fill={getLEDColor()}
        stroke="#666666"
        strokeWidth={1}
      />
      
      {/* Glow effect when on */}
      {isOn && (
        <Circle
          x={0}
          y={0}
          radius={12}
          fill={getGlowColor()}
          opacity={brightness * 0.3}
          shadowColor={getGlowColor()}
          shadowBlur={8}
          shadowOpacity={brightness * 0.5}
        />
      )}

      {/* Anode pin (longer, positive) */}
      <Rect
        x={-1}
        y={-15}
        width={2}
        height={7}
        fill="#cccccc"
      />

      {/* Cathode pin (shorter, negative) */}
      <Rect
        x={-1}
        y={8}
        width={2}
        height={5}
        fill="#cccccc"
      />

      {/* Flat edge indicator for cathode */}
      <Rect
        x={-8}
        y={6}
        width={4}
        height={1}
        fill="#999999"
      />
    </Group>
  );
};
