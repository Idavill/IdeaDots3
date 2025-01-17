import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, PivotControls } from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./ThreeDContainer.css";
import API from "../Services/API";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { v4 as uuidv4 } from "uuid";

CameraControls.install({ THREE });

function Sphere({ position, title, text, zoomToView, focus, gizmo, id }) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [pos, setPos] = useState(position);
  const meshRef = useRef();

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
    <>
      <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[pos.x, pos.y, pos.z]}
      >
        <mesh
          ref={meshRef}
          onClick={(e) => zoomToView(e.object.position)}
          position={pos}
          onPointerOver={(event) => (event.stopPropagation(), hover(true))}
          onPointerOut={(event) => hover(false)}
          scale={0.2}
        >
          <sphereGeometry />
          <meshStandardMaterial
            color={clicked ? "rgb(55, 52, 255)" : "white"}
            roughness={0.75}
            emissive="#404057"
            opacity={0.4}
            transparent
          />
          {hovered ? (
            <Html distanceFactor={10}>
              <div className="content">
                <h2>{title}</h2>
              </div>
            </Html>
          ) : null}
        </mesh>
      </PivotControls>
    </>
  );
}

function Content({
  zoom,
  setZoom,
  spheres,
  setSpheres,
  setFocus,
  focusSphere,
  newSphere,
  scrollToIdea,
  gizmo,
}) {
  useEffect(() => {
    if (newSphere) {
      addNewSphere(newSphere);
    }
  }, [newSphere]);

  useEffect(() => {
    if (spheres) {
      setSpheres(spheres);
    }
  }, [spheres]);

  const addNewSphere = (ns) => {
    const newS = {
      id: uuidv4(),
      position: { x: ns.x, y: ns.y, z: ns.z },
      title: "",
      text: "",
      img: "",
    };
    setSpheres((prevSpheres) => [newS, ...prevSpheres]);
  };

  // useEffect(() => {
  //   getSphereData();
  //   console.log("useffect in App ");
  // }, []);

  // const getSphereData = async () => {
  //   const spheres = apiInstance.handleGetLocalSpheresJsonData();
  //   if (spheres) {
  //     for (const s of spheres) {
  //       setSpheres((prevs) => [...prevs, s]);
  //     }
  //   } else {
  //     console.log("no spheres in App");
  //   }
  // };

  const sphereList = () => {
    return spheres.map((s, i) => (
      <>
        <Sphere
          gizmo={gizmo}
          zoomToView={(focusRef) => (
            setZoom(!zoom), setFocus(focusRef), scrollToIdea(s, i)
          )}
          key={i}
          position={[s.position.x, s.position.y, s.position.z]}
          title={s.title}
          text={s.text}
          focus={focusSphere}
          id={s.id}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}

function CustomControls({ zoom, focus, gizmo }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = true;
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
    <>
      {!gizmo ? (
        <OrbitControls
          ref={controlsRef}
          camera={camera}
          gl={gl}
          enableRotate={true}
          enablePan={true}
          enableZoom={true}
        />
      ) : null}
    </>
  );
}

export default function ThreeDContainer({
  sphere,
  scrollToIdea,
  activeIdea,
  cameraTarget,
  setActiveIdea,
  setSpheres,
  gizmo,
}) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [newSphere, setNewSphere] = useState(null);

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

  useEffect(() => {
    if (sphere) {
      //setSpheres(spheres);
    }
  }, [sphere]);

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
            gizmo={gizmo}
            scrollToIdea={(s, i) => scrollToIdea(s, i)}
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            spheres={sphere}
            setSpheres={(e) => setSpheres(e)}
            focusSphere={focus}
            newSphere={newSphere}
          />
          <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.25} />
          <Suspense fallback={<Model url="./Assets/WCPOM.gltf" />}>
            <Model
              url="./Assets/WCPOM.gltf"
              setNewSphere={(e) => setNewSphere(e)}
            />
          </Suspense>
          <CustomControls zoom={zoom} focus={focus} gizmo={gizmo} />
        </Canvas>
      </Suspense>
    </div>
  );
}

function Model({ url, setNewSphere }) {
  const { scene } = useGLTF(url);

  const handleDoubleClick = (e) => {
    console.log("double click", e.point);
    setNewSphere(e.point);
  };

  return (
    <primitive
      onDoubleClick={(e) => handleDoubleClick(e)}
      object={scene}
    ></primitive>
  );
}
