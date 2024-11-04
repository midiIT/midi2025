import Button from '@/components/MainPage/Button.tsx';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">MIDI 2025</h1>
      <div className="flex flex-row gap-4">
        <Button buttonText="Terminal" to="cli" />
        <Button buttonText="Graphical" to="gui" />
      </div>
    </div>
  );
}

export default App;