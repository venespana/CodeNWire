import type { Position, Size } from '@/types';

export const snapToGrid = (position: Position, gridSize: number): Position => ({
  x: Math.round(position.x / gridSize) * gridSize,
  y: Math.round(position.y / gridSize) * gridSize,
});

export const calculateDistance = (pos1: Position, pos2: Position): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const isPointInBounds = (point: Position, bounds: Size): boolean => {
  return point.x >= 0 && point.x <= bounds.width && point.y >= 0 && point.y <= bounds.height;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
