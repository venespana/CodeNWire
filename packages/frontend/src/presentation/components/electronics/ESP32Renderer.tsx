import React from 'react';
import { Group, Rect, Text, Circle } from 'react-konva';
import type { ESP32Entity } from '@/domain/entities/ESP32';

interface ESP32RendererProps {
  component: ESP32Entity;
  x: number;
  y: number;
  onClick?: () => void;
  draggable?: boolean;
}

export const ESP32Renderer: React.FC<ESP32RendererProps> = ({
  component,
  x,
  y,
  onClick,
  draggable = false
}) => {
  const { boardWidth, boardHeight, pins } = component;
  const pinSize = 4;

  return (
    <Group
      x={x}
      y={y}
      draggable={draggable}
      onClick={onClick}
    >
      {/* Main board */}
      <Rect
        x={0}
        y={0}
        width={boardWidth}
        height={boardHeight}
        fill="#2d5016"
        stroke="#1a3009"
        strokeWidth={2}
        cornerRadius={5}
      />

      {/* Board label */}
      <Text
        x={boardWidth / 2}
        y={15}
        text="ESP32-DEVKIT-V1"
        fontSize={12}
        fontFamily="Arial"
        fill="#ffffff"
        align="center"
        offsetX={50}
      />

      {/* USB connector */}
      <Rect
        x={boardWidth / 2 - 10}
        y={-5}
        width={20}
        height={10}
        fill="#c0c0c0"
        stroke="#808080"
        strokeWidth={1}
        cornerRadius={2}
      />

      {/* Reset button */}
      <Circle
        x={30}
        y={30}
        radius={6}
        fill="#ff0000"
        stroke="#cc0000"
        strokeWidth={1}
      />
      <Text
        x={30}
        y={45}
        text="RST"
        fontSize={8}
        fill="#ffffff"
        align="center"
        offsetX={8}
      />

      {/* Boot button */}
      <Circle
        x={170}
        y={30}
        radius={6}
        fill="#0000ff"
        stroke="#0000cc"
        strokeWidth={1}
      />
      <Text
        x={170}
        y={45}
        text="BOOT"
        fontSize={8}
        fill="#ffffff"
        align="center"
        offsetX={12}
      />

      {/* ESP32 chip representation */}
      <Rect
        x={boardWidth / 2 - 25}
        y={boardHeight / 2 - 15}
        width={50}
        height={30}
        fill="#333333"
        stroke="#666666"
        strokeWidth={1}
        cornerRadius={2}
      />
      <Text
        x={boardWidth / 2}
        y={boardHeight / 2}
        text="ESP32"
        fontSize={10}
        fontFamily="Arial"
        fill="#ffffff"
        align="center"
        offsetX={15}
      />

      {/* Left pins */}
      {pins.filter(pin => pin.position.x < boardWidth / 2).map((pin) => (
        <Group key={pin.id}>
          <Circle
            x={pin.position.x}
            y={pin.position.y}
            radius={pinSize}
            fill="#ffd700"
            stroke="#cc9900"
            strokeWidth={1}
          />
          <Text
            x={pin.position.x + 10}
            y={pin.position.y - 3}
            text={pin.label}
            fontSize={8}
            fill="#ffffff"
          />
        </Group>
      ))}

      {/* Right pins */}
      {pins.filter(pin => pin.position.x >= boardWidth / 2).map((pin) => (
        <Group key={pin.id}>
          <Circle
            x={pin.position.x}
            y={pin.position.y}
            radius={pinSize}
            fill="#ffd700"
            stroke="#cc9900"
            strokeWidth={1}
          />
          <Text
            x={pin.position.x - 10}
            y={pin.position.y - 3}
            text={pin.label}
            fontSize={8}
            fill="#ffffff"
            align="right"
            offsetX={pin.label.length * 4}
          />
        </Group>
      ))}

      {/* Power LED */}
      <Circle
        x={170}
        y={280}
        radius={3}
        fill="#0000ff"
      />

      {/* Built-in LED indicator */}
      <Circle
        x={30}
        y={280}
        radius={3}
        fill="#ff0000"
      />
    </Group>
  );
};
