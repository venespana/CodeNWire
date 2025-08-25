import React from 'react';
import { Group, Rect, Line } from 'react-konva';
import type { ResistorComponent } from '@/domain/entities/ElectronicComponent';

interface ResistorRendererProps {
  component: ResistorComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const ResistorRenderer: React.FC<ResistorRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { value, tolerance } = properties;

  const getColorBands = (resistance: number, tolerancePercent: number) => {
    const colors = [
      '#000000', // 0 - Black
      '#8B4513', // 1 - Brown
      '#FF0000', // 2 - Red
      '#FFA500', // 3 - Orange
      '#FFFF00', // 4 - Yellow
      '#00FF00', // 5 - Green
      '#0000FF', // 6 - Blue
      '#8A2BE2', // 7 - Violet
      '#808080', // 8 - Gray
      '#FFFFFF', // 9 - White
    ];

    const toleranceColors: { [key: number]: string } = {
      1: '#8B4513', // Brown
      2: '#FF0000', // Red
      5: '#FFD700', // Gold
      10: '#C0C0C0', // Silver
    };

    const valueStr = resistance.toString();
    let significantDigits = valueStr.replace(/0+$/, '');
    const multiplier = valueStr.length - significantDigits.length;

    if (significantDigits.length < 2) {
      significantDigits = significantDigits.padEnd(2, '0');
    }

    const firstDigit = parseInt(significantDigits[0]);
    const secondDigit = parseInt(significantDigits[1]);

    return [
      colors[firstDigit],
      colors[secondDigit],
      colors[multiplier],
      toleranceColors[tolerancePercent] || '#FFD700',
    ];
  };

  const colorBands = getColorBands(value, tolerance);

  return (
    <Group
      x={position.x}
      y={position.y}
      rotation={rotation}
      draggable={draggable}
      onClick={onClick}
    >
      {/* Left wire */}
      <Line
        points={[-25, 0, -15, 0]}
        stroke="#cccccc"
        strokeWidth={2}
      />

      {/* Resistor body */}
      <Rect
        x={-15}
        y={-4}
        width={30}
        height={8}
        fill="#D2B48C"
        stroke="#8B7355"
        strokeWidth={1}
        cornerRadius={1}
      />

      {/* Color bands */}
      {colorBands.map((color, index) => (
        <Rect
          key={index}
          x={-12 + index * 6}
          y={-4}
          width={3}
          height={8}
          fill={color}
          stroke={color === '#FFFFFF' ? '#000000' : undefined}
          strokeWidth={color === '#FFFFFF' ? 0.5 : 0}
        />
      ))}

      {/* Right wire */}
      <Line
        points={[15, 0, 25, 0]}
        stroke="#cccccc"
        strokeWidth={2}
      />
    </Group>
  );
};
