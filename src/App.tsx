import Button from '@/components/MainPage/Button.tsx';
import Countdown from '@/components/CountdownComponent/Countdown';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">MIDI 2025</h1>
      {/* example how to give a targetDate */}
      <Countdown targetDate="2024-12-31T23:59:59" /> 
      <div className="flex flex-row gap-4">
        <Button buttonText="Terminal" to="cli" />
        <Button buttonText="Graphical" to="gui" />
      </div>
    </div>
  );
}

export default App;
