import { Group, Rect, Text, Circle } from 'react-konva';
import { useState } from 'react';

interface ESP32BoardProps {
  x: number;
  y: number;
  draggable?: boolean;
  onClick?: () => void;
}

const ESP32Board = ({ x, y, draggable = true, onClick }: ESP32BoardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // ESP32 board dimensions
  const boardWidth = 200;
  const boardHeight = 300;
  const pinSpacing = 12;
  const pinSize = 4;

  // Pin labels for ESP32
  const leftPins = [
    'EN', '36', '39', '34', '35', '32', '33', '25', '26', '27',
    '14', '12', 'GND', '13', '9', '10', '11', 'VIN'
  ];

  const rightPins = [
    '3V3', 'GND', '15', '2', '0', '4', '16', '17', '5', '18',
    '19', '21', 'RX0', 'TX0', '22', '23', 'GND', 'CLK'
  ];

  return (
    <Group
      x={x}
      y={y}
      draggable={draggable}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={onClick}
    >
      {/* Main board */}
      <Rect
        width={boardWidth}
        height={boardHeight}
        fill="#2a2a2a"
        stroke="#4a4a4a"
        strokeWidth={2}
        cornerRadius={8}
        shadowColor="black"
        shadowBlur={isDragging ? 10 : 5}
        shadowOpacity={0.3}
      />

      {/* ESP32 chip area */}
      <Rect
        x={50}
        y={80}
        width={100}
        height={60}
        fill="#1a1a1a"
        stroke="#666"
        strokeWidth={1}
        cornerRadius={4}
      />

      {/* WiFi symbol */}
      <Group x={90} y={100}>
        <Circle x={0} y={0} radius={2} fill="#00ff00" />
        <Circle x={0} y={0} radius={8} stroke="#00ff00" strokeWidth={1} />
        <Circle x={0} y={0} radius={15} stroke="#00ff00" strokeWidth={1} />
      </Group>

      {/* Board label */}
      <Text
        x={boardWidth / 2}
        y={20}
        text="ESP32-DEVKIT-V1"
        fontSize={10}
        fontFamily="Arial"
        fill="white"
        align="center"
        offsetX={50}
      />

      {/* Left pins */}
      {leftPins.map((pin, index) => (
        <Group key={`left-${index}`}>
          <Circle
            x={-5}
            y={40 + index * pinSpacing}
            radius={pinSize}
            fill="#ffd700"
            stroke="#cc9900"
            strokeWidth={1}
          />
          <Text
            x={10}
            y={37 + index * pinSpacing}
            text={pin}
            fontSize={8}
            fontFamily="Arial"
            fill="white"
          />
        </Group>
      ))}

      {/* Right pins */}
      {rightPins.map((pin, index) => (
        <Group key={`right-${index}`}>
          <Circle
            x={boardWidth + 5}
            y={40 + index * pinSpacing}
            radius={pinSize}
            fill="#ffd700"
            stroke="#cc9900"
            strokeWidth={1}
          />
          <Text
            x={boardWidth - 30}
            y={37 + index * pinSpacing}
            text={pin}
            fontSize={8}
            fontFamily="Arial"
            fill="white"
            align="right"
          />
        </Group>
      ))}

      {/* USB connector */}
      <Rect
        x={boardWidth / 2 - 10}
        y={-5}
        width={20}
        height={10}
        fill="#333"
        stroke="#666"
        strokeWidth={1}
        cornerRadius={2}
      />

      {/* Power LED */}
      <Circle
        x={30}
        y={30}
        radius={3}
        fill="#ff0000"
      />

      {/* Status LED */}
      <Circle
        x={170}
        y={30}
        radius={3}
        fill="#0000ff"
      />
    </Group>
  );
};

export default ESP32Board;
