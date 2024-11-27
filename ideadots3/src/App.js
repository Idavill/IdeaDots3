import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./App.css";
import API from "./Services/API";
import ListMode from "./Component/ListMode";

function Sphere({ position, title, text }) {
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
          <h2>{title}</h2>
          <h3>{text}</h3>
        </div>
      </Html>
    </mesh>
  );
}

function Content({ time, ...props }) {
  const apiInstance = API();
  const [spheres, setSpheres] = useState([]);

  useEffect(() => {
    getSphereData();
    console.log("useffect ");
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();
    console.log("get spheres : ", spheres);

    if (spheres) {
      for (const s of spheres) {
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres");
    }
  };

  const sphereList = () => {
    console.log(spheres.count);
    return spheres.map((s, i) => (
      <>
        <Sphere
          key={i}
          position={[s.position.x, s.position.y, s.position.z]}
          title={s.title}
          text={s.text}
        />
      </>
    ));
  };

  const IdeaList = () => {
    return spheres.map((s, i) => (
      <>
        <div className="listcontent">
          <div className="texts">
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
          <button className="textbutton" type="button">
            Go
          </button>
        </div>
      </>
    ));
  };

  return (
    <>
      {sphereList()}{" "}
      <Html distanceFactor={10}>
        <div
          className="listcontents"
          transform
          occlude
          position={[100, 0.05, -0.09]}
        >
          {IdeaList()}
        </div>
      </Html>
    </>
  );
}

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ marginLeft: "40px" }}>Idea Dots</h1>

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
            enablePan={false}
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
