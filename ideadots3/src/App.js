import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Suspense fallback={<span>loading...</span>}>
        <Canvas dpr={[1, 2]} camera={{ position: [2, 0, 4], fov: 50 }}>
          <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.25} />
          <Suspense fallback={<Model url="./Assets/untitled.gltf" />}>
            <Model url="./Assets/untitled.gltf" />
          </Suspense>
          <OrbitControls
            autoRotatex
            autoRotateSpeed={0}
            enableRotate={true}
            enablePan={true}
            enableZoom={true}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return (
    <primitive object={scene} {...props}>
      {/* Added material */}
    </primitive>
  );
}
