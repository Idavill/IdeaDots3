import { Suspense, useEffect, useRef, useState } from "react";
import { GizmoHelper, GizmoViewport, Gltf, SpotLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import "./ThreeDContainer.css";
import * as THREE from "three";
import CameraControls from "camera-controls";
import Content from "./Content";
import { IdeaType } from "../../Entities";
import { Group } from "three";
CameraControls.install({ THREE });

interface ThreeDContainerProps {
  scrollToIdea: (idea: IdeaType, i: number) => void;
  cameraTarget: IdeaType | null; //TODO: check correct
  setActiveIdea: (idea: IdeaType) => void;
  isThreeDModeActive: boolean;
  activeIdea: IdeaType | null;
  gizmo: number | null;
  isListModeActive: boolean;
  isDotModeActive: boolean;
}

export default function ThreeDContainer({
  scrollToIdea,
  cameraTarget,
  setActiveIdea,
  isThreeDModeActive,
  activeIdea,
  gizmo,
  isListModeActive,
  isDotModeActive,
}: ThreeDContainerProps) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [newSphere, setNewSphere] = useState<THREE.Vector3 | null>(null);
  //const [currentZoom, setCurrentZoom] = useState(false);
  const controlsRef = useRef(null); // TODO: check correct?
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
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [6, 4, 10],
            fov: 50,
          }}
        >
          <Content
            activeIdea={activeIdea}
            isThreeDModeActive={isThreeDModeActive}
            isDotModeActive={isDotModeActive}
            setActiveIdea={(idea: IdeaType) => setActiveIdea(idea)}
            gizmo={gizmo}
            scrollToIdea={(idea: IdeaType, i: number) => scrollToIdea(idea, i)}
            zoom={zoom}
            setZoom={setZoom}
            setFocus={setFocus}
            newSphere={newSphere}
            controlsRef={controlsRef}
            //setCurrentZoom={(z) => setCurrentZoom(z)}
            setEnableCustomControls={setEnableCustomControls}
            isListModeActive={isListModeActive}
          />

          {/* <directionalLight position={[10, 10, 0]} intensity={1.5} />
          <directionalLight position={[-10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.25} /> */}
          <SpotLight
            distance={5}
            angle={0.15}
            attenuation={5}
            anglePower={5} // Diffuse-cone anglePower (default: 5)
          />
          {/* <Suspense fallback={<Model url="./Assets/WCPOM.gltf" />}> */}
          <Suspense fallback={<Gltf src={"./Assets/WCPOM.gltf"} />}>
            {/* <Model
              url="./Assets/WCPOM.gltf"
              setNewSphere={(idea: IdeaType) => setNewSphere(idea)}
            /> */}
            <Gltf src={"./Assets/WCPOM.gltf"} />
          </Suspense>
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          <OrbitControls makeDefault />
        </Canvas>
      </Suspense>
    </div>
  );
}
