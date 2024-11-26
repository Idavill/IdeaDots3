import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./App.css";
import API from "./Services/API";

function Sphere({ position }) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh
      position={position}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry />
      <meshStandardMaterial
        color={hovered ? "red" : "white"}
        roughness={0.75}
        emissive="#404057"
      />
      <Html distanceFactor={10}>
        <div className="content">
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  );
}

function Content({ time, ...props }) {
  const apiInstance = API();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getSphereData();
    console.log("useffect ");
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();
    console.log("get spheres : ", spheres);

    if (spheres) {
      for (const s of spheres) {
        setPositions((squarePositions) => [...squarePositions, s.position]);
      }
    } else {
      console.log("no spheres");
    }
  };

  const sphereList = () => {
    return positions.map((position, i) => (
      <Sphere key={i} position={[position.x, position.y, position.z]} />
    ));
  };

  return <>{sphereList()}</>;
}

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Suspense fallback={<span>loading...</span>}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [2, 0, 4],
            fov: 50,
          }}
        >
          <Content />
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
