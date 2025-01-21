import React, { useEffect, useRef, useState, useContext } from "react";
import ThreeDDot from "./ThreeDDot.js";
import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Ensure this import is correct
import ThreeDImage from "./ThreeDImage.js";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider.js";

export default function Sphere({
  s,
  id,
  position,
  zoomToView,
  gizmo,
  activeIdea,
  setActiveIdea,
  controlsRef,
  setEnableCustomControls,
  isThreeDModeActive,
  isListModeActive,
  isDotModeActive,
  amountOfSpheres,
}) {
  const [hovered, hover] = useState(false);
  const ideaContext = useContext(ActiveIdeaContext);
  const [clicked, click] = useState(false);
  const [scale, setScale] = useState(3);
  const [distanceFactorForZoom, setDistanceFactorForZoom] = useState(10);

  //TODO: insteda useeffect
  useFrame(() => {
    if (controlsRef.current) {
      setDistanceFactorForZoom(controlsRef.current.object.position); // OrbitControls object.zoom
    }
  });

  // useEffect(() => {
  //   if (activeIdea) {
  //     click(activeIdea.id === id ? true : false);
  //   }
  // }, [activeIdea]);

  useEffect(() => {
    if (ideaContext.activeIdea) {
      click(ideaContext.activeIdea.id === id ? true : false);
    }
  }, [ideaContext.activeIdea]);

  const handleClick = (e) => {
    if (isListModeActive) {
      zoomToView(e.object.position);
      ideaContext.setActiveIdea(s);
    }
    click(!clicked);
  };

  return (
    <>
      <PivotControls
        enabled={gizmo === id ? true : false}
        activeAxes={[true, true, true]}
        anchor={[position.x, position.y, position.z]}
      >
        {isDotModeActive ? (
          <ThreeDDot
            s={s}
            amountOfSpheres={amountOfSpheres}
            activeIdea={activeIdea}
            setActiveIdea={setActiveIdea}
            position={position}
            text={s.text}
            id={id}
            setEnableCustomControls={setEnableCustomControls}
          ></ThreeDDot>
        ) : (
          <>
            <ThreeDImage
              id={id}
              hover={hover}
              dimensions={[150, 150]}
              scale={1}
              setScale={(e) => setScale(e)}
              setEnableCustomControls={setEnableCustomControls}
              onClick={(e) => handleClick(e)}
              onPointerOver={(event) => (event.stopPropagation(), hover(true))}
              onPointerOut={() => hover(false)}
              ideaId={id}
              position={position}
              distanceFactorForZoom={distanceFactorForZoom}
              isThreeDModeActive={isThreeDModeActive}
            ></ThreeDImage>
          </>
        )}
      </PivotControls>
    </>
  );
}
