import '@wokwi/elements';

// import CircuitCanvas from './components/CircuitCanvas';
// import { ComponentToolbar } from './presentation/components/ui/ComponentToolbar';
import ArduinoUno from './presentation/components/electronics/ArduinoUno';
import InoEditor from './presentation/components/inoEditor';
import TopBar from './presentation/components/ui/TopBar';

function App() {
  return (
    <div className='h-screen bg-gray-800 flex flex-col'>
      <TopBar />
      <div className='flex flex-row flex-1'>
        <div className='flex-1 flex'>
          <InoEditor />
        </div>
        <div className='flex-1 flex'>
          {/* <ComponentToolbar /> */}
          {/* <CircuitCanvas /> */}
          <ArduinoUno />
        </div>
      </div>
    </div>
  );
}

export default App;
