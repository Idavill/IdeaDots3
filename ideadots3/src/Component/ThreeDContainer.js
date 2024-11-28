import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./ThreeDContainer.css";
import API from "../Services/API";
import * as THREE from "three";
import { Vector3 } from "three";
import CameraControls from "camera-controls";

CameraControls.install({ THREE });

function Sphere({ position, title, text, zoomToView, focus }) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useEffect(() => {
    if (
      focus.x == position[0] &&
      focus.y == position[1] &&
      focus.z == position[2]
    ) {
      click(true);
    } else {
      click(false);
    }
  }, [focus]);

  return (
    <mesh
      onClick={(e) => zoomToView(e.object.position)}
      position={position}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
      scale={0.3}
    >
      <sphereGeometry />
      <meshStandardMaterial
        color={clicked ? "rgb(55, 52, 255)" : "white"}
        roughness={0.75}
        emissive="#404057"
      />
      {hovered ? (
        <Html distanceFactor={10}>
          <div className="content">
            <h2>{title}</h2>
            {/* <h3>{text}</h3> */}
          </div>
        </Html>
      ) : null}
    </mesh>
  );
}

function Content({ time, s, zoom, setZoom, setFocus, focusSphere }) {
  const [spheres, setSpheres] = useState([]);
  const apiInstance = API();

  useEffect(() => {
    console.log("Set focus sphere: ", focusSphere);
  }, [focusSphere]);

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
          zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
          key={i}
          position={[s.position.x, s.position.y, s.position.z]}
          title={s.title}
          text={s.text}
          focus={focusSphere}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}

function CustomControls({ zoom, focus }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = true; // Ensure zoom is enabled
    }
  }, []);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      // Adjust the target based on zoom and focus
      const target = new THREE.Vector3();
      if (zoom) {
        target.set(focus.x, focus.y, focus.z); // Set target to focus point
        controlsRef.current.target.lerp(target, 0.1); // Smoothly move towards the target
      } else {
        controlsRef.current.target.set(0, 0, 0); // Reset target when not zooming
      }

      controlsRef.current.update(); // Update controls to apply changes
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      gl={gl}
      enableRotate={true}
      enablePan={true}
      enableZoom={true}
    />
  );
}

export default function ThreeDContainer({
  spheres,
  cameraTarget,
  setCameraTarget,
  setActiveIdea,
}) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  useEffect(() => {
    if (cameraTarget) {
      console.log("ct: ", cameraTarget.position);
      setZoom(true);
      setFocus(cameraTarget.position);
    }
  }, [cameraTarget]);

  useEffect(() => {
    if (focus) {
      console.log("focus ", focus);
      setActiveIdea(focus);
    }
  }, [focus]);

  return (
    <div style={{ height: "100vh" }}>
      <Suspense fallback={<span>loading...</span>}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [6, 4, 10],
            fov: 50,
          }}
        >
          <Content
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            spheres={spheres}
            focusSphere={focus}
          />
          <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.25} />
          <Suspense fallback={<Model url="./Assets/untitled.gltf" />}>
            <Model url="./Assets/untitled.gltf" />
          </Suspense>
          <OrbitControls
            enableRotate={true}
            enablePan={true}
            enableZoom={true}
          />
          <CustomControls zoom={zoom} focus={focus} />
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
