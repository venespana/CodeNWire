# CodeNWire Frontend

React application for ESP32 circuit designer with drag-and-drop functionality.

## 🏗️ Architecture

This project follows **Clean Architecture** principles to maintain organized, testable, and maintainable code.

## 📁 Folder Structure

```
src/
├── application/          # Application Layer
│   ├── repositories/     # Repository interfaces
│   └── usecases/        # Application use cases
│
├── components/          # Legacy components (migrating)
│   ├── CircuitCanvas.tsx
│   ├── ComponentToolbar.tsx
│   └── ESP32Board.tsx
│
├── domain/              # Domain Layer
│   ├── entities/        # Domain entities
│   └── types/           # Domain types and interfaces
│       └── index.ts     # Main types (Component, Circuit, etc.)
│
├── infrastructure/      # Infrastructure Layer
│   ├── services/        # External services (APIs, WebSocket)
│   └── store/           # Store configuration (future)
│
├── presentation/        # Presentation Layer
│   ├── components/      # Reusable UI components
│   │   └── Grid.tsx     # Canvas grid component
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Main pages/views
│   └── stores/          # Zustand stores
│       ├── circuitStore.ts  # Circuit state
│       ├── uiStore.ts       # UI state
│       └── index.ts         # Centralized exports
│
├── shared/              # Shared code
│   ├── constants/       # Global constants
│   │   └── components.ts # Component constants
│   └── utils/           # Utilities and helpers
│       └── canvas.ts    # Canvas utilities
│
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Architecture Layers

### **Domain**
- **Purpose**: Contains business logic and domain rules
- **Content**: Entities, types, interfaces
- **Dependencies**: None (innermost layer)

### **Application**
- **Purpose**: Use cases and application logic
- **Content**: Repository interfaces, use cases
- **Dependencies**: Domain only

### **Infrastructure**
- **Purpose**: Technical implementations and external services
- **Content**: APIs, WebSocket, persistence
- **Dependencies**: Domain and application

### **Presentation**
- **Purpose**: UI, React components, interface state
- **Content**: Components, hooks, stores, pages
- **Dependencies**: All layers

## 🛠️ Main Technologies

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Zustand** - Gestión de estado global
- **React Konva** - Canvas 2D para el diseñador
- **NextUI** - Librería de componentes UI
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos

## 📦 Gestión de Estado

### **Zustand Stores**

#### `circuitStore.ts`
```typescript
// Estado del circuito y componentes
- circuit: Circuit              // Circuito actual
- selectedComponent: Component  // Componente seleccionado
- selectedConnection: Connection // Conexión seleccionada
- isSimulating: boolean         // Estado de simulación

// Acciones
- addComponent()       // Agregar componente
- removeComponent()    // Eliminar componente
- updateComponent()    // Actualizar componente
- selectComponent()    // Seleccionar componente
- startSimulation()    // Iniciar simulación
- stopSimulation()     // Detener simulación
```

#### `uiStore.ts`
```typescript
// Estado de la interfaz
- canvasSize: Size       // Tamaño del canvas
- zoom: number          // Nivel de zoom
- panOffset: Position   // Offset de paneo
- gridVisible: boolean  // Visibilidad de la grilla
- snapToGrid: boolean   // Snap a la grilla

// Acciones
- setCanvasSize()       // Configurar tamaño
- setZoom()            // Configurar zoom
- toggleGrid()         // Toggle grilla
- toggleSnapToGrid()   // Toggle snap
```

## 🎨 Configuración de Rutas

Utilizamos `vite-tsconfig-paths` para resolver automáticamente las rutas configuradas en `tsconfig.json`:

```typescript
// Rutas disponibles
"@/*"           → "./src/*"
"@/components/*" → "./src/presentation/components/*"
"@/hooks/*"     → "./src/presentation/hooks/*"
"@/store/*"     → "./src/infrastructure/store/*"
"@/types"       → "./src/domain/types/index.ts"
"@/utils/*"     → "./src/shared/utils/*"
"@/constants/*" → "./src/shared/constants/*"
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm preview          # Preview del build

# Testing
pnpm test             # Ejecutar tests
pnpm test:ui          # UI de testing
pnpm test:coverage    # Coverage de tests

# Linting y Formatting
pnpm lint             # Ejecutar ESLint
pnpm lint:fix         # Corregir errores de lint
pnpm format           # Formatear código
pnpm format:check     # Verificar formato

# Utilidades
pnpm typecheck        # Verificar tipos
pnpm clean            # Limpiar cache
```

## 🔧 Configuración

### **Vite** (`vite.config.ts`)
- Plugin React
- Plugin vite-tsconfig-paths
- Servidor en puerto 3000
- Sourcemaps habilitados

### **TypeScript** (`tsconfig.json`)
- Target ES2020
- Strict mode habilitado
- Path mapping configurado
- JSX React

### **ESLint** 
- Configuración para React + TypeScript
- Prettier integrado
- Reglas de imports
- Detección de hooks no utilizados

## 🎮 Funcionalidades Implementadas

### ✅ Completadas
- [x] Configuración de monorepo con pnpm
- [x] Setup de Vite + React + TypeScript
- [x] Arquitectura Clean Code
- [x] Stores de Zustand (circuito + UI)
- [x] Canvas con React Konva
- [x] Componente ESP32 Board
- [x] Sistema de grilla
- [x] Drag and drop básico
- [x] Toolbar de componentes
- [x] Configuración de rutas con vite-tsconfig-paths

### 🚧 Pendientes
- [ ] Más componentes electrónicos (LED, resistor, sensor)
- [ ] Sistema de conexiones entre componentes
- [ ] Panel de propiedades
- [ ] Lógica de simulación
- [ ] Generación de código Arduino
- [ ] Persistencia de circuitos

## 🏃‍♂️ Cómo Empezar

1. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

2. **Ejecutar en desarrollo**:
   ```bash
   pnpm dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 📝 Convenciones de Código

- **Componentes**: PascalCase (`ComponentName.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useCustomHook.ts`)
- **Stores**: camelCase con sufijo `Store` (`circuitStore.ts`)
- **Tipos**: PascalCase (`ComponentType`, `Circuit`)
- **Constantes**: UPPER_SNAKE_CASE (`GRID_SIZE`)
- **Archivos**: camelCase (`utilityFunction.ts`)

## 🤝 Contribución

1. Seguir la estructura de Clean Architecture
2. Mantener la separación de responsabilidades
3. Escribir tests para nuevas funcionalidades
4. Usar TypeScript estricto
5. Seguir las convenciones de naming
6. Documentar componentes complejos

---

**Desarrollado con ❤️ para CodeNWire ESP32 Simulator**
