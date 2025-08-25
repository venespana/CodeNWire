import React from 'react';
import { Group, Circle, Rect } from 'react-konva';
import type { PushButtonComponent } from '@/domain/entities/ElectronicComponent';

interface PushButtonRendererProps {
  component: PushButtonComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const PushButtonRenderer: React.FC<PushButtonRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  const { position, rotation, properties } = component;
  const { isPressed, buttonColor, size } = properties;

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { bodyRadius: 8, buttonRadius: 6, pinLength: 8 };
      case 'large':
        return { bodyRadius: 15, buttonRadius: 12, pinLength: 12 };
      default: // medium
        return { bodyRadius: 12, buttonRadius: 9, pinLength: 10 };
    }
  };

  const { bodyRadius, buttonRadius, pinLength } = getSizeConfig();
  const buttonOffset = isPressed ? 2 : 0;

  return (
    <Group
      x={position.x}
      y={position.y}
      rotation={rotation}
      draggable={draggable}
      onClick={onClick}
    >
      {/* Button body */}
      <Circle
        x={0}
        y={0}
        radius={bodyRadius}
        fill="#333333"
        stroke="#666666"
        strokeWidth={1}
      />

      {/* Button cap */}
      <Circle
        x={0}
        y={buttonOffset}
        radius={buttonRadius}
        fill={buttonColor}
        stroke="#ffffff"
        strokeWidth={1}
        shadowColor="#000000"
        shadowBlur={isPressed ? 2 : 4}
        shadowOffset={{ x: 0, y: isPressed ? 1 : 2 }}
        shadowOpacity={0.3}
      />

      {/* Top pins */}
      <Rect
        x={-bodyRadius - 3}
        y={-bodyRadius / 2}
        width={pinLength}
        height={1.5}
        fill="#cccccc"
      />
      <Rect
        x={bodyRadius + 3 - pinLength}
        y={-bodyRadius / 2}
        width={pinLength}
        height={1.5}
        fill="#cccccc"
      />

      {/* Bottom pins */}
      <Rect
        x={-bodyRadius - 3}
        y={bodyRadius / 2}
        width={pinLength}
        height={1.5}
        fill="#cccccc"
      />
      <Rect
        x={bodyRadius + 3 - pinLength}
        y={bodyRadius / 2}
        width={pinLength}
        height={1.5}
        fill="#cccccc"
      />

      {/* Pin labels (small dots) */}
      <Circle x={-bodyRadius - 2} y={-bodyRadius / 2} radius={0.5} fill="#999999" />
      <Circle x={bodyRadius + 2} y={-bodyRadius / 2} radius={0.5} fill="#999999" />
      <Circle x={-bodyRadius - 2} y={bodyRadius / 2} radius={0.5} fill="#999999" />
      <Circle x={bodyRadius + 2} y={bodyRadius / 2} radius={0.5} fill="#999999" />
    </Group>
  );
};
