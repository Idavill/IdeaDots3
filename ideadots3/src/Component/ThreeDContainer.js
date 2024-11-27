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

function Sphere({ position, title, text, zoomToView }) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh
      onClick={(e) => zoomToView(e.object.position)}
      position={position}
      // onClick={(event) => click(!clicked)}
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

function Content({ time, s, zoom, setZoom, setFocus }) {
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
          zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
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

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5);
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

export default function ThreeDContainer({ spheres, cameraTarget }) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  useEffect(() => {
    if (cameraTarget) {
      console.log("ct: ", cameraTarget.position);
      setZoom(true);
    }
  }, [cameraTarget]);

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ marginLeft: "40px" }}>Idea Dots</h1>

      <Suspense fallback={<span>loading...</span>}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [1, 2, 1],
            fov: 50,
          }}
        >
          <Content
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            spheres={spheres}
          />
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
          <Controls zoom={zoom} focus={focus} />
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
