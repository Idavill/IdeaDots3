import React, { useEffect, useRef, useState, useContext } from "react";
import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";
import ImageIdea from "./ImageIdea.js";
import { SphereContext } from "./SphereContextProvider";
import { Html } from "@react-three/drei";
import { PivotControls } from "@react-three/drei";

export default function Sphere({
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

  return (
    <>
      <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[pos.x, pos.y, pos.z]}
      >
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
                </div>
              </Html>
              <Html
                //position={focusLabel ? position : [100, 100, 100]}
                distanceFactor={2}
              >
                <ImageIdea
                  setEnableCustomControls={setEnableCustomControls}
                  hover={hover}
                  scale={scale}
                  setScale={(e) => setScale(e)}
                  image={image}
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
