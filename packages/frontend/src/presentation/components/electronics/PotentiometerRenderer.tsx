import React from 'react';
import { Group, Circle, Arc, Line, Rect } from 'react-konva';
import type { PotentiometerComponent } from '@/domain/entities/ElectronicComponent';

interface PotentiometerRendererProps {
  component: PotentiometerComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const PotentiometerRenderer: React.FC<PotentiometerRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { value, type } = properties;

  const knobAngle = (value * 270) - 135; // -135° to +135°

  if (type === 'linear') {
    return (
      <Group
        x={position.x}
        y={position.y}
        rotation={rotation}
        draggable={draggable}
        onClick={onClick}
      >
        {/* Body */}
        <Rect
          x={-15}
          y={-4}
          width={30}
          height={8}
          fill="#4a4a4a"
          stroke="#666666"
          strokeWidth={1}
          cornerRadius={2}
        />

        {/* Track */}
        <Rect
          x={-12}
          y={-1}
          width={24}
          height={2}
          fill="#222222"
        />

        {/* Slider */}
        <Rect
          x={-12 + (value * 24) - 2}
          y={-3}
          width={4}
          height={6}
          fill="#cccccc"
          stroke="#999999"
          strokeWidth={1}
        />

        {/* Pins */}
        <Rect x={-2} y={-12} width={1.5} height={8} fill="#cccccc" />
        <Rect x={0.5} y={-12} width={1.5} height={8} fill="#cccccc" />
        <Rect x={3} y={-12} width={1.5} height={8} fill="#cccccc" />
      </Group>
    );
  }

  return (
    <Group
      x={position.x}
      y={position.y}
      rotation={rotation}
      draggable={draggable}
      onClick={onClick}
    >
      {/* Body */}
      <Circle
        x={0}
        y={0}
        radius={12}
        fill="#4a4a4a"
        stroke="#666666"
        strokeWidth={1}
      />

      {/* Track arc */}
      <Arc
        x={0}
        y={0}
        innerRadius={8}
        outerRadius={10}
        angle={270}
        rotation={-135}
        fill="#222222"
      />

      {/* Knob */}
      <Circle
        x={0}
        y={0}
        radius={6}
        fill="#cccccc"
        stroke="#999999"
        strokeWidth={1}
      />

      {/* Knob indicator */}
      <Line
        points={[0, 0, 0, -4]}
        stroke="#333333"
        strokeWidth={2}
        rotation={knobAngle}
      />

      {/* Pins */}
      <Rect x={-1} y={-20} width={1.5} height={8} fill="#cccccc" />
      <Rect x={0.5} y={-20} width={1.5} height={8} fill="#cccccc" />
      <Rect x={2} y={-20} width={1.5} height={8} fill="#cccccc" />

      {/* Pin labels */}
      <Circle x={-1} y={-18} radius={0.5} fill="#999999" />
      <Circle x={1} y={-18} radius={0.5} fill="#999999" />
      <Circle x={3} y={-18} radius={0.5} fill="#999999" />
    </Group>
  );
};
