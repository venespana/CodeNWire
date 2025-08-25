import React from 'react';
import { Group, Rect, Line } from 'react-konva';
import type { CapacitorComponent } from '@/domain/entities/ElectronicComponent';

interface CapacitorRendererProps {
  component: CapacitorComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const CapacitorRenderer: React.FC<CapacitorRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { type, polarity } = properties;

  const getCapacitorBody = () => {
    switch (type) {
      case 'electrolytic':
        return (
          <Group>
            {/* Cylindrical body */}
            <Rect
              x={-8}
              y={-12}
              width={16}
              height={24}
              fill="#4a4a4a"
              stroke="#666666"
              strokeWidth={1}
              cornerRadius={2}
            />
            
            {/* Top cap */}
            <Rect
              x={-8}
              y={-12}
              width={16}
              height={3}
              fill="#333333"
              cornerRadius={2}
            />

            {/* Polarity marking */}
            {polarity && (
              <>
                <Line
                  points={[-4, -8, 4, -8]}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
                <Line
                  points={[0, -12, 0, -4]}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              </>
            )}

            {/* Negative stripe */}
            <Rect
              x={4}
              y={-12}
              width={2}
              height={24}
              fill="#cccccc"
            />
          </Group>
        );

      case 'tantalum':
        return (
          <Group>
            {/* Rectangular body */}
            <Rect
              x={-6}
              y={-4}
              width={12}
              height={8}
              fill="#d4af37"
              stroke="#b8860b"
              strokeWidth={1}
            />
            
            {/* Polarity band */}
            <Rect
              x={-6}
              y={-4}
              width={2}
              height={8}
              fill="#ffffff"
            />
          </Group>
        );

      default: // ceramic
        return (
          <Group>
            {/* Ceramic disc */}
            <Rect
              x={-8}
              y={-3}
              width={16}
              height={6}
              fill="#d2b48c"
              stroke="#8b7355"
              strokeWidth={1}
              cornerRadius={3}
            />
          </Group>
        );
    }
  };

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
        points={[-20, 0, -10, 0]}
        stroke="#cccccc"
        strokeWidth={2}
      />

      {/* Capacitor symbol plates */}
      <Line
        points={[-2, -8, -2, 8]}
        stroke="#333333"
        strokeWidth={2}
      />
      <Line
        points={[2, -8, 2, 8]}
        stroke="#333333"
        strokeWidth={2}
      />

      {/* Capacitor body */}
      {getCapacitorBody()}

      {/* Right wire */}
      <Line
        points={[10, 0, 20, 0]}
        stroke="#cccccc"
        strokeWidth={2}
      />

      {/* Polarity indicator for electrolytic */}
      {type === 'electrolytic' && polarity && (
        <>
          <Line
            points={[-15, -3, -12, -3]}
            stroke="#ff0000"
            strokeWidth={1}
          />
          <Line
            points={[-13.5, -4.5, -13.5, -1.5]}
            stroke="#ff0000"
            strokeWidth={1}
          />
        </>
      )}
    </Group>
  );
};
