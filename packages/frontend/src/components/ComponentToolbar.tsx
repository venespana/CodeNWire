import { Card, CardBody } from '@nextui-org/react';

import { COMPONENT_DEFINITIONS } from '@/constants/components';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import type { ComponentType } from '@/types';

interface ComponentToolbarProps {
  onComponentDrop: (componentType: ComponentType, position: { x: number; y: number }) => void;
}

const ComponentToolbar = ({ onComponentDrop }: ComponentToolbarProps) => {
  const { handleDragStart } = useDragAndDrop({ onComponentDrop });

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
      <h3 className="text-white text-lg font-semibold mb-4">Componentes</h3>

      <div className="space-y-3">
        {COMPONENT_DEFINITIONS.map((component) => {
          const IconComponent = component.icon;
          return (
            <Card
              key={component.id}
              className="cursor-grab active:cursor-grabbing hover:bg-gray-700 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, component.id)}
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${component.color}`}>
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {component.name}
                  </span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <h4 className="text-gray-400 text-sm font-medium mb-3">Instrucciones</h4>
        <p className="text-gray-500 text-xs leading-relaxed">
          Arrastra los componentes al canvas para crear tu circuito.
          Usa el botón verde para ejecutar la simulación.
        </p>
      </div>
    </div>
  );
};

export default ComponentToolbar;
