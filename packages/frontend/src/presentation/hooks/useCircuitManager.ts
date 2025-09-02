import React, { useState, useCallback } from 'react';
import { JsonComponentRepository } from '@/infrastructure/repositories/JsonComponentRepository';
import { 
  AddComponentToCircuitUseCase,
  SaveCircuitUseCase,
  LoadCircuitUseCase,
  ClearCircuitUseCase
} from '@/application/usecases/CircuitManagement';
import { 
  GetAllComponentsUseCase,
  DeleteComponentUseCase,
  UpdateComponentUseCase
} from '@/application/usecases/ComponentManagement';
import type { ElectronicComponent } from '@/domain/entities/ElectronicComponent';
import type { Position } from '@/domain/types';

export const useCircuitManager = () => {
  const [components, setComponents] = useState<ElectronicComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ElectronicComponent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize repository and use cases
  const repository = new JsonComponentRepository();
  const addComponentUseCase = new AddComponentToCircuitUseCase(repository);
  const saveCircuitUseCase = new SaveCircuitUseCase(repository);
  const loadCircuitUseCase = new LoadCircuitUseCase(repository);
  const clearCircuitUseCase = new ClearCircuitUseCase(repository);
  const getAllComponentsUseCase = new GetAllComponentsUseCase(repository);
  const deleteComponentUseCase = new DeleteComponentUseCase(repository);
  const updateComponentUseCase = new UpdateComponentUseCase(repository);

  const refreshComponents = useCallback(async () => {
    try {
      const allComponents = await getAllComponentsUseCase.execute();
      setComponents(allComponents);
    } catch (error) {
      console.error('Failed to refresh components:', error);
    }
  }, [getAllComponentsUseCase]);

  const addComponent = useCallback(async (type: string, position: Position) => {
    try {
      setIsLoading(true);
      const newComponent = await addComponentUseCase.execute(type, position);
      await refreshComponents();
      return newComponent;
    } catch (error) {
      console.error('Failed to add component:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addComponentUseCase, refreshComponents]);

  const deleteComponent = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await deleteComponentUseCase.execute(id);
      await refreshComponents();
      if (selectedComponent?.id === id) {
        setSelectedComponent(null);
      }
    } catch (error) {
      console.error('Failed to delete component:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [deleteComponentUseCase, refreshComponents, selectedComponent]);

  const updateComponent = useCallback(async (
    id: string, 
    updates: Partial<{ position: Position; rotation: number; properties: Record<string, any> }>
  ) => {
    try {
      const updatedComponent = await updateComponentUseCase.execute(id, updates);
      await refreshComponents();
      if (selectedComponent?.id === id) {
        setSelectedComponent(updatedComponent);
      }
      return updatedComponent;
    } catch (error) {
      console.error('Failed to update component:', error);
      throw error;
    }
  }, [updateComponentUseCase, refreshComponents, selectedComponent]);

  const saveCircuit = useCallback(async () => {
    try {
      setIsLoading(true);
      const jsonData = await saveCircuitUseCase.execute();
      
      // Download JSON file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `circuit-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return jsonData;
    } catch (error) {
      console.error('Failed to save circuit:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [saveCircuitUseCase]);

  const loadCircuit = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      const jsonData = await file.text();
      await loadCircuitUseCase.execute(jsonData);
      await refreshComponents();
      setSelectedComponent(null);
    } catch (error) {
      console.error('Failed to load circuit:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [loadCircuitUseCase, refreshComponents]);

  const clearCircuit = useCallback(async () => {
    try {
      setIsLoading(true);
      await clearCircuitUseCase.execute();
      await refreshComponents();
      setSelectedComponent(null);
    } catch (error) {
      console.error('Failed to clear circuit:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearCircuitUseCase, refreshComponents]);

  const selectComponent = useCallback((component: ElectronicComponent | null) => {
    setSelectedComponent(component);
  }, []);

  // Load components on mount
  React.useEffect(() => {
    refreshComponents();
  }, [refreshComponents]);

  return {
    components,
    selectedComponent,
    isLoading,
    addComponent,
    deleteComponent,
    updateComponent,
    saveCircuit,
    loadCircuit,
    clearCircuit,
    selectComponent,
    refreshComponents
  };
};
