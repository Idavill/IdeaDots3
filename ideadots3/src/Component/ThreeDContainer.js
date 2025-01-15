import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  PivotControls,
  DragControls,
} from "@react-three/drei";
import { Html } from "@react-three/drei";
import "./ThreeDContainer.css";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "./SphereContextProvider";
import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";
import DraggableUI from "./DraggableUI.js";

CameraControls.install({ THREE });

function Sphere({
  position,
  title,
  text,
  zoomToView,
  focus,
  gizmo,
  id,
  listActive,
  controlsRef,
  currentZoom,
  enableCustomControls,
  setEnableCustomControls,
}) {
  const [sphereTitle, setSphereTitle] = useState(title);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [pos, setPos] = useState(position);
  const meshRef = useRef();
  const context = useContext(SphereContext);
  const [focusLabel, setFocusLabel] = useState(false);
  const [radius, setRadius] = useState(0.5);
  const [scale, setScale] = useState(3);

  useEffect(() => {
    alignSphereTitleWithIdeaTitle();
  }, [context]);

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

  function dragElement(e) {
    const elmnt = document.getElementById("draggable");
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      //pos1 = pos3 - e.clientX;
      //pos2 = pos4 - e.clientY;
      //pos3 = e.clientX;
      //pos4 = e.clientY;

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      console.log("pos 1: ", pos1);
      console.log("pos 2: ", pos2);

      console.log("pos 3: ", pos3);

      console.log("pos 4: ", pos4);

      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <>
      {/* <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[pos.x, pos.y, pos.z]}
      > */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          zoomToView(e.object.position);
          setFocusLabel(!focusLabel);
        }}
        position={pos}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
        scale={0.3}
      >
        <sphereGeometry />
        <meshStandardMaterial
          color={clicked ? "rgb(55, 52, 255)" : "white"}
          roughness={0.75}
          emissive="#404057"
          opacity={0.4}
          transparent
        />
        {hovered || focusLabel ? (
          <>
            <Html distanceFactor={10}>
              <div className="contentContainer">
                <div className="contentLabel">
                  <h2>{sphereTitle}</h2>
                </div>
                {/* {!listActive ? (
                  ) : // <div className="contentImage">
                  //   <UploadAndDisplayImage
                  //     ideaId={id}
                  //     displayButtons={false}
                  //   />
                  // </div>
                  null} */}
              </div>
            </Html>
            <Html
              //position={focusLabel ? position : [100, 100, 100]}
              distanceFactor={2}
            >
              <div
                id="draggable"
                style={{ position: "absolute" }}
                onMouseDown={(e) => (
                  dragElement(e), setEnableCustomControls(false)
                )}
                onMouseUp={(e) => setEnableCustomControls(true)}
              >
                <div id="draggableheader">
                  <div
                    onPointerOver={(i) => (hover(i), setScale(4))}
                    onPointerLeave={() => (hover(null), setScale(3))}
                    className="contentContainer"
                    style={{
                      translate: "200px 10px",
                      transform: `scale(${scale})`,
                    }}
                  >
                    <div className="threedImage">
                      <img
                        style={{
                          height: "100px",
                          width: "100px",
                        }}
                        src={image}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </Html>
          </>
        ) : null}
      </mesh>

      {/* </PivotControls> */}
    </>
  );

  function alignSphereTitleWithIdeaTitle() {
    console.log("IDEA");
    context.spheres.forEach((e) => {
      if (e.id == id) {
        setSphereTitle(e.title);
      }
    });
  }
}

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
      {!gizmo && enableCustomControls ? (
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
