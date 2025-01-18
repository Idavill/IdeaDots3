import React, { useEffect, useRef, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import { Html } from "@react-three/drei";
import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import DisplayImage from "./DisplayImageThreeD.js";
import { useFrame } from "@react-three/fiber"; // Ensure this import is correct
import ThreeDImage from "./ThreeDImage.js";
import testImage from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/shelf.jpg";

export default function Sphere({
  id,
  position,
  zoomToView,
  gizmo,
  activeIdea,
  controlsRef,
  setEnableCustomControls,
  isThreeDModeActive,
}) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [scale, setScale] = useState(3);
  const [distanceFactorForZoom, setDistanceFactorForZoom] = useState(10);

  //TODO: insteda useeffect
  useFrame(() => {
    if (controlsRef.current) {
      setDistanceFactorForZoom(controlsRef.current.object.position); // OrbitControls object.zoom
    }
  });

  useEffect(() => {
    if (activeIdea) {
      click(activeIdea.id === id ? true : false);
    }
  }, [activeIdea]);

  const handleClick = (e) => {
    console.log("click");
    zoomToView(e.object.position);
    click(!clicked);
  };

  return (
    <>
      <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[position.x, position.y, position.z]}
      >
        <>
          {!isThreeDModeActive ? (
            <Html distanceFactor={distanceFactorForZoom}>
              <DisplayImage
                ideaId={id}
                hover={hover}
                clicked={clicked}
                setEnableCustomControls={setEnableCustomControls}
                setScale={(e) => setScale(e)}
                scale={scale}
              />
            </Html>
          ) : null}
          <ThreeDImage
            onClick={(e) => handleClick(e)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
            ideaId={id}
            position={position}
          ></ThreeDImage>
          {/* <Billboard key={10202020}>
              <Image
                transparent
                radius={0.3}
                position={pos}
                scale={[1, 2, 1]}
                url={testImage}
              />
            </Billboard> */}
        </>
      </PivotControls>
    </>
  );
}
