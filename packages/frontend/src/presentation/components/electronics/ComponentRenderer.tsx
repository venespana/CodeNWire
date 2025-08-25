import React from 'react';
import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';
import { LEDRenderer } from './LEDRenderer';
import { ResistorRenderer } from './ResistorRenderer';
import { PushButtonRenderer } from './PushButtonRenderer';
import { PotentiometerRenderer } from './PotentiometerRenderer';
import { CapacitorRenderer } from './CapacitorRenderer';
import { ToggleSwitchRenderer } from './ToggleSwitchRenderer';

interface ComponentRendererProps {
  component: ElectronicComponent;
  onClick?: () => void;
  draggable?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  onClick,
  draggable = false
}) => {
  switch (component.type) {
    case 'led':
      return (
        <LEDRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    case 'resistor':
      return (
        <ResistorRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    case 'pushbutton':
      return (
        <PushButtonRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    case 'potentiometer':
      return (
        <PotentiometerRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    case 'capacitor':
      return (
        <CapacitorRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    case 'toggleswitch':
      return (
        <ToggleSwitchRenderer
          component={component as any}
          onClick={onClick}
          draggable={draggable}
        />
      );
    default:
      return null;
  }
};
