import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import "./ThreeDContainer.css";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import Sphere from "./Sphere";

CameraControls.install({ THREE });

function Content({
  zoom,
  setZoom,
  setFocus,
  focusSphere,
  newSphere,
  scrollToIdea,
  gizmo,
  listActive,
  controlsRef,
  currentZoom,
  enableCustomControls,
  setEnableCustomControls,
}) {
  const context = useContext(SphereContext);

  useEffect(() => {
    if (newSphere) {
      addNewSphere(newSphere);
    }
  }, [newSphere]);

  const addNewSphere = (ns) => {
    const newS = {
      id: uuidv4(),
      position: { x: ns.x, y: ns.y, z: ns.z },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevSpheres) => [...prevSpheres, newS]);
    const newSTitleID = newS.id + "title";
    const newSTextID = newS.id + "text";
    localStorage.setItem(newSTitleID, newS.title);
    localStorage.setItem(newSTextID, newS.text);
  };

  const sphereList = () => {
    return context.spheres.map((s, i) => (
      <>
        <Sphere
          listActive={listActive}
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
          controlsRef={controlsRef}
          currentZoom={currentZoom}
          enableCustomControls={enableCustomControls}
          setEnableCustomControls={(e) => setEnableCustomControls(e)}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}

function CustomControls({
  setCurrentZoom,
  currentZoom,
  controlsRef,
  zoom,
  focus,
  gizmo,
  enableCustomControls,
}) {
  const { camera, gl } = useThree();

  // useFrame(() => {
  //   if (controlsRef.current) {
  //     const z = controlsRef.current.object.position.z; // Get the current zoom value
  //     console.log("Current Zoom: ", z); // Log or use the zoom value as needed
  //     setCurrentZoom(z);
  //   }
  // });

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
          enableRotate={enableCustomControls ? true : false}
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
  gizmo,
  listActive,
}) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [newSphere, setNewSphere] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(false);
  const controlsRef = useRef();
  const [enableCustomControls, setEnableCustomControls] = useState(true);

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
            listActive={listActive}
            gizmo={gizmo}
            scrollToIdea={(s, i) => scrollToIdea(s, i)}
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            focusSphere={focus}
            newSphere={newSphere}
            controlsRef={controlsRef}
            currentZoom={currentZoom}
            enableCustomControls={enableCustomControls}
            setEnableCustomControls={(e) => setEnableCustomControls(e)}
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
          <CustomControls
            controlsRef={controlsRef}
            zoom={zoom}
            focus={focus}
            gizmo={gizmo}
            currentZoom={currentZoom}
            setCurrentZoom={(z) => setCurrentZoom(z)}
            enableCustomControls={enableCustomControls}
          />
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
