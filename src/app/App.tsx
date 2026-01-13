import { UnitValuePanel } from "../shared/features/unit-value";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="bg-neutral-800 p-4 rounded-lg w-[50%] h-[50%]">
        <UnitValuePanel />
      </div>
    </div>
  );
};

export default App;
