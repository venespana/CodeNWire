import { Card, CardBody, CardHeader } from '@nextui-org/react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="pb-0 pt-6 px-6 flex-col items-start">
          <h1 className="text-3xl font-bold text-gray-800">Hello World!</h1>
          <p className="text-gray-600 text-sm">CodeNWire ESP32 Simulator</p>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <p className="text-gray-700">
            Bienvenido a CodeNWire - Tu simulador profesional de ESP32 y Arduino con diseño visual de circuitos.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
