import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Component/Model.js";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

createRoot(document.getElementById("root")).render(<App />);
