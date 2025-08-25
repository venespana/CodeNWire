import React from 'react';
import { Group, Rect, Circle, Line } from 'react-konva';
import type { ToggleSwitchComponent } from '@/domain/entities/ElectronicComponent';

interface ToggleSwitchRendererProps {
  component: ToggleSwitchComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const ToggleSwitchRenderer: React.FC<ToggleSwitchRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { isOn, switchType, size } = properties;

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { width: 20, height: 12, knobSize: 4 };
      case 'large':
        return { width: 40, height: 24, knobSize: 8 };
      default: // medium
        return { width: 30, height: 18, knobSize: 6 };
    }
  };

  const { width, height, knobSize } = getSizeConfig();

  const renderSlideSwitch = () => (
    <Group>
      {/* Track */}
      <Rect
        x={-width / 2}
        y={-height / 4}
        width={width}
        height={height / 2}
        fill="#333333"
        stroke="#666666"
        strokeWidth={1}
        cornerRadius={height / 4}
      />

      {/* Slider knob */}
      <Circle
        x={isOn ? width / 4 : -width / 4}
        y={0}
        radius={knobSize}
        fill={isOn ? '#00ff00' : '#cccccc'}
        stroke="#999999"
        strokeWidth={1}
        shadowColor="#000000"
        shadowBlur={2}
        shadowOffset={{ x: 0, y: 1 }}
        shadowOpacity={0.3}
      />
    </Group>
  );

  const renderToggleSwitch = () => (
    <Group>
      {/* Base */}
      <Rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill="#4a4a4a"
        stroke="#666666"
        strokeWidth={1}
        cornerRadius={2}
      />

      {/* Toggle lever */}
      <Line
        points={[0, 0, isOn ? width / 3 : -width / 3, isOn ? -height / 3 : -height / 3]}
        stroke="#cccccc"
        strokeWidth={3}
        lineCap="round"
      />

      {/* Pivot point */}
      <Circle
        x={0}
        y={0}
        radius={2}
        fill="#666666"
      />
    </Group>
  );

  const renderRockerSwitch = () => (
    <Group>
      {/* Base */}
      <Rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill="#333333"
        stroke="#666666"
        strokeWidth={1}
        cornerRadius={3}
      />

      {/* Rocker */}
      <Rect
        x={-width / 2 + 2}
        y={isOn ? -height / 2 + 2 : 0}
        width={width - 4}
        height={height / 2 - 2}
        fill={isOn ? '#00ff00' : '#cccccc'}
        stroke="#999999"
        strokeWidth={1}
        cornerRadius={2}
      />

      {/* Labels */}
      <Circle x={0} y={-height / 4} radius={1} fill="#ffffff" />
      <Line points={[-2, height / 4, 2, height / 4]} stroke="#ffffff" strokeWidth={1} />
    </Group>
  );

  const renderSwitch = () => {
    switch (switchType) {
      case 'slide':
        return renderSlideSwitch();
      case 'rocker':
        return renderRockerSwitch();
      default:
        return renderToggleSwitch();
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
      {renderSwitch()}

      {/* Pins */}
      <Rect x={-1} y={-height / 2 - 8} width={1.5} height={6} fill="#cccccc" />
      <Rect x={1} y={-height / 2 - 8} width={1.5} height={6} fill="#cccccc" />
      <Rect x={-1} y={height / 2 + 2} width={1.5} height={6} fill="#cccccc" />
    </Group>
  );
};
