# 🔌 CodeNWire

**Professional ESP32 Simulator with Visual Circuit Design**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![VSCode](https://img.shields.io/badge/VSCode-0078d7.svg?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

> A modern, open-source ESP32 simulator that bridges the gap between code and hardware through visual circuit design and real-time simulation.

## 🌟 Features

### 🎨 **Visual Circuit Designer**

- Drag-and-drop component placement
- Real-time circuit visualization with Konva.js
- Professional grid-based canvas
- Component library with ESP32, sensors, displays, and more
- Visual connection system with automatic routing

### 💻 **Integrated Development Environment**

- Monaco Editor with C/C++ syntax highlighting
- IntelliSense and code completion
- Real-time compilation feedback
- Project management and file explorer
- Seamless VSCode extension integration

### ⚡ **Real-time Simulation**

- Accurate ESP32 GPIO simulation
- Serial monitor with bidirectional communication
- Component state visualization (LEDs, displays, sensors)
- Performance monitoring and debugging tools
- WebSocket-based real-time updates

### 🔧 **Professional Tooling**

- TypeScript throughout the stack
- Modern React 18 with hooks
- Express.js backend with Socket.io
- Material-UI component library
- Comprehensive testing suite

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   VSCode        │    │   Node.js       │    │   React         │
│   Extension     │◄──►│   Backend       │◄──►│   Frontend      │
│   (TypeScript)  │    │   (Express)     │    │   (TypeScript)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File System   │    │   WebSocket     │    │   Canvas/SVG    │
│   Integration   │    │   Real-time     │    │   Circuit View  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- **VSCode** 1.74+ (for extension)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/venespana/CodeNWire.git
   cd CodeNWire
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

3. **Start development servers**

```bash
pnpm dev
```

## Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

## 📁 Project Structure

```
CodeNWire/
├── packages/
│   ├── frontend/                  # React Application
│   │   ├── src/
│   │   │   ├── components/        # React Components
│   │   │   ├── pages/            # Application Pages
│   │   │   ├── hooks/            # Custom React Hooks
│   │   │   ├── store/            # Zustand State Management
│   │   │   ├── services/         # API Services
│   │   │   └── types/            # TypeScript Definitions
│   │   ├── public/
│   │   └── package.json
│   ├── backend/                   # Node.js Server
│   │   ├── src/
│   │   │   ├── routes/           # Express Routes
│   │   │   ├── services/         # Business Logic
│   │   │   ├── models/           # Data Models
│   │   │   ├── middleware/       # Express Middleware
│   │   │   └── socket/           # WebSocket Handlers
│   │   └── package.json
│   └── vscode-extension/          # VSCode Extension
│       ├── src/
│       │   ├── providers/        # Tree Data Providers
│       │   ├── commands/         # Extension Commands
│       │   └── webview/          # Webview Integration
│       └── package.json
├── shared/                        # Shared Types & Utils
├── docs/                          # Documentation
├── examples/                      # Example Projects
└── package.json                   # Monorepo Root
```

## 🎯 Usage Examples

### Basic LED Blink

```cpp
#define LED_PIN 2

void setup() {
    Serial.begin(115200);
    pinMode(LED_PIN, OUTPUT);
    Serial.println("ESP32 CodeNWire Simulator Started");
}

void loop() {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("LED ON");
    delay(1000);

    digitalWrite(LED_PIN, LOW);
    Serial.println("LED OFF");
    delay(1000);
}
```

### Sensor Reading

```cpp
#include "DHT.h"

#define DHT_PIN 4
#define DHT_TYPE DHT22

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
    Serial.begin(115200);
    dht.begin();
}

void loop() {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print("°C, Humidity: ");
    Serial.print(humidity);
    Serial.println("%");

    delay(2000);
}
```

## 🛠️ Development

### Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI, Konva.js, Zustand
- **Backend**: Node.js, Express, Socket.io, TypeScript, Zod
- **Extension**: VSCode API, TypeScript, Webpack
- **Tools**: Vite, ESLint, Prettier, Jest, Vitest

### Development Scripts

```bash
# Start all development servers
npm run dev

# Start individual services
npm run dev:frontend
npm run dev:backend

# Build for production
npm run build

# Run tests
npm run test

# Lint and format
npm run lint
npm run format

# Build VSCode extension
npm run build:extension
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 🤝 Community

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Discord**: Join our community server (coming soon)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ESP32 Community** for inspiration and hardware documentation
- **Open Source Contributors** who make projects like this possible

## 📊 Project Status

![GitHub issues](https://img.shields.io/github/issues/venespana/CodeNWire)
![GitHub pull requests](https://img.shields.io/github/issues-pr/venespana/CodeNWire)
![GitHub stars](https://img.shields.io/github/stars/venespana/CodeNWire)
![GitHub forks](https://img.shields.io/github/forks/venespana/CodeNWire)

---

<div align="center">

**Made with ❤️ by the CodeNWire Community**

[Website](https://codenWire.dev) • [Documentation](https://docs.codenWire.dev) • [Examples](https://examples.codenWire.dev)

</div>
