import React, { useEffect, useRef, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import { Html } from "@react-three/drei";
import { PivotControls } from "@react-three/drei";
import DisplayImage from "./DisplayImageThreeD.js";
import { useFrame } from "@react-three/fiber"; // Ensure this import is correct

export default function Sphere({
  position,
  title,
  text,
  zoomToView,
  focus,
  gizmo,
  id,
  // listActive,
  controlsRef,
  currentZoom,
  // enableCustomControls,
  setEnableCustomControls,
  // image,
  activeSphereId,
  setActiveSphereId,
}) {
  const [sphereTitle, setSphereTitle] = useState(title);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [pos, setPos] = useState(position);
  const meshRef = useRef();
  const context = useContext(SphereContext);
  const [focusLabel, setFocusLabel] = useState(false);
  const [scale, setScale] = useState(3);
  const [distanceFactorForZoom, setDistanceFactorForZoom] = useState(10);

  useEffect(() => {
    console.log("REF: ", currentZoom);
  }, [currentZoom]);

  // Update the zoom value on each frame
  //TODO: insteda useeffect
  useFrame(() => {
    if (controlsRef.current) {
      //console.log(controlsRef.current.object.position);
      //const zoomFactor = controlsRef.current.object.position;
      setDistanceFactorForZoom(controlsRef.current.object.position); // OrbitControls object.zoom
    }
  });

  // useEffect(() => {
  //   if (controlsRef.current) {
  //     console.log("HEY");
  //   }
  // }, [controlsRef.current]);

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

  const handleClick = (e) => {
    zoomToView(e.object.position);
    if (activeSphereId !== id) {
      setActiveSphereId(id);
      setFocusLabel(true);
      click(true);
    } else {
      //setActiveSphereId(null);
      setFocusLabel(false);
      click(false);
    }
  };

  return (
    <>
      <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[pos.x, pos.y, pos.z]}
      >
        <mesh
          ref={meshRef}
          onClick={handleClick}
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
          {hovered || clicked ? (
            <Html
              //position={clicked ? [-100, -100] : position}
              position={position}
              distanceFactor={distanceFactorForZoom}
            >
              <div className="contentContainer">
                <div className="contentLabel">
                  <h2>{sphereTitle}</h2>
                </div>
              </div>
            </Html>
          ) : null}
          {hovered || activeSphereId === id ? ( // clicked?
            <>
              <Html
                position={clicked || hovered ? position : [100, 100, 100]}
                distanceFactor={distanceFactorForZoom * distanceFactorForZoom}
              >
                <DisplayImage
                  ideaId={id}
                  hover={hover}
                  clicked={clicked}
                  setEnableCustomControls={setEnableCustomControls}
                  setScale={(e) => setScale(e)}
                  scale={scale}
                />
              </Html>
            </>
          ) : null}
        </mesh>
      </PivotControls>
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
