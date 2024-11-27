import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./ThreeDContainer.css";
import API from "../Services/API";

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

function Content({ time, s }) {
  const [spheres, setSpheres] = useState([]);
  const apiInstance = API();

  useEffect(() => {
    getSphereData();
    console.log("useffect in App ");
  }, []);

  const getSphereData = async () => {
    const spheres = apiInstance.handleGetLocalSpheresJsonData();
    console.log("get spheres : ", spheres);

    if (spheres) {
      for (const s of spheres) {
        setSpheres((prevs) => [...prevs, s]);
      }
    } else {
      console.log("no spheres in App");
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

  return <>{sphereList()} </>;
}

export default function ThreeDContainer({ spheres, cameraTarget }) {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (cameraTarget) {
      console.log("ct: ", cameraTarget.position);
      setZoom(true);
    }
  }, [cameraTarget]);

  useEffect(() => {
    if (zoom) {
      console.log("zoom");
    }
  }, [zoom]);

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ marginLeft: "40px" }}>Idea Dots</h1>

      <Suspense fallback={<span>loading...</span>}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [10, 20, 12],
            fov: 20,
          }}
        >
          <Content spheres={spheres} />
          <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.25} />
          <Suspense fallback={<Model url="./Assets/untitled.gltf" />}>
            <Model url="./Assets/untitled.gltf" />
          </Suspense>
          <OrbitControls
            target={
              cameraTarget
                ? [
                    cameraTarget.position.x,
                    cameraTarget.position.y,
                    cameraTarget.position.z,
                  ]
                : [0, 0, 0]
            }
            zoom0={zoom ? 10 : 100}
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
