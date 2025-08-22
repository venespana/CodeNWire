import { Group, Rect } from 'react-konva';

import type { Size } from '@/types';
import { GRID_SIZE } from '@/constants/components';

interface GridProps {
  size: Size;
  opacity?: number;
}

export const Grid = ({ size, opacity = 0.1 }: GridProps) => {
  const gridLines = [];

  // Vertical lines
  for (let i = 0; i <= size.width; i += GRID_SIZE) {
    gridLines.push(
      <Rect
        key={`v-${i}`}
        x={i}
        y={0}
        width={1}
        height={size.height}
        fill={`rgba(255, 255, 255, ${opacity})`}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= size.height; i += GRID_SIZE) {
    gridLines.push(
      <Rect
        key={`h-${i}`}
        x={0}
        y={i}
        width={size.width}
        height={1}
        fill={`rgba(255, 255, 255, ${opacity})`}
      />
    );
  }

  return <Group>{gridLines}</Group>;
};
