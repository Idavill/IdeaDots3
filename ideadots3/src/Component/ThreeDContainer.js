import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  useKeyboardControls,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";
import "./ThreeDContainer.css";
import * as THREE from "three";
import CameraControls from "camera-controls";
import Content from "./Content";

CameraControls.install({ THREE });

function CustomControls({
  controlsRef,
  zoom,
  focus,
  gizmo,
  enableCustomControls,
}) {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (controlsRef.current) {
      const target = new THREE.Vector3();
      if (zoom) {
        //console.log("ZOOM :", controlsRef.current.object.position);
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
          //enableRotate={enableCustomControls ? true : false}
          enablePan={true}
          enableZoom={true}
        />
      ) : null}
    </>
  );
}

export default function ThreeDContainer({
  scrollToIdea,
  cameraTarget,
  setActiveIdea,
  isThreeDModeActive,
  activeIdea,
  gizmo,
  listActive,
  isListModeActive,
  isDotModeActive,
}) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [newSphere, setNewSphere] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(false);
  const controlsRef = useRef();
  const [enableCustomControls, setEnableCustomControls] = useState(true);

  useEffect(() => {
    if (cameraTarget) {
      setZoom(true);
      setFocus(cameraTarget.position);
    }
  }, [cameraTarget]);

  useEffect(() => {
    console.log("customer contorls ", enableCustomControls);
  }, [enableCustomControls]);

  return (
    <div style={{ height: "100vh" }}>
      <Suspense fallback={<span>loading...</span>}>
        {/* <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
          ]}
        > */}
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [6, 4, 10],
            fov: 50,
          }}
        >
          {/* <MovementControls controlsRef={controlsRef} /> */}

          <Content
            activeIdea={activeIdea}
            isThreeDModeActive={isThreeDModeActive}
            isDotModeActive={isDotModeActive}
            setActiveIdea={(e) => setActiveIdea(e)}
            //listActive={listActive}
            gizmo={gizmo}
            scrollToIdea={(s, i) => scrollToIdea(s, i)}
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            //focusSphere={focus}
            newSphere={newSphere}
            controlsRef={controlsRef}
            //currentZoom={currentZoom}
            setCurrentZoom={(z) => setCurrentZoom(z)}
            //enableCustomControls={enableCustomControls}
            setEnableCustomControls={setEnableCustomControls}
            isListModeActive={isListModeActive}
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
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          <OrbitControls makeDefault />
          {/* <CustomControls
            controlsRef={controlsRef}
            zoom={zoom}
            focus={focus}
            gizmo={gizmo}
            currentZoom={currentZoom}
            setCurrentZoom={(z) => setCurrentZoom(z)}
            enableCustomControls={enableCustomControls}
          /> */}
          {/* <PointerLockControls /> */}
        </Canvas>
        {/* </KeyboardControls> */}
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

function MovementControls({ controlsRef }) {
  const [subscribedKeys, getKeys] = useKeyboardControls();
  useFrame(() => {
    console.log(getKeys());
  });

  useFrame(() => {
    const { forward, backward, left, right, jump } = getKeys();

    // Adjust camera or controls based on key inputs
    if (controlsRef.current) {
      if (forward) controlsRef.current.object.position.z -= 0.1; // Move forward
      if (backward) controlsRef.current.object.position.z += 0.1; // Move backward
      if (left) controlsRef.current.object.position.x -= 0.1; // Move left
      if (right) controlsRef.current.object.position.x += 0.1; // Move right
    }
  });

  return null;
}
