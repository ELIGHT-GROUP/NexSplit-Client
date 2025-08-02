import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/assets/android-chrome-192x192.png"
        alt="React Logo"
        className="w-50 h-50"
      />
      <Button className="bg-blue-500 text-white">NexSplit</Button>
    </div>
  );
}

export default App;
