import { useState } from "react";
import "./App.css";
import { StudentForm } from "./student/StudentForm";
import { StudentManagement } from "./student/StudentManagement";
import { StudentProvider } from "./provider/StudentProvider";

function Counter() {
  const [counter, setCounter] = useState(0);

  const handlePlus = () => setCounter(counter + 1);

  const handleMinus = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleReset = () => setCounter(0);

  return (
    <>
      <h3 className="text-2xl text-center p-3">{counter}</h3>
      <div className="flex justify-center items-center h-full gap-3">
        <button
          className="w-[100px] rounded bg-blue-500 text-white px-4 py-2"
          onClick={handleMinus}
        >
          Minus
        </button>
        <button
          className="w-[100px] rounded bg-green-500 text-white px-4 py-2"
          onClick={handlePlus}
        >
          Plus
        </button>
        <button
          className="w-[100px] rounded bg-red-500 text-white px-4 py-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <StudentProvider>
        <StudentManagement />
      </StudentProvider>
    </>
  );
}

export default App;
