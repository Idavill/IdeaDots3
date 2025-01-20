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
            activeIdea={activeIdea}
            setActiveIdea={setActiveIdea}
            position={position}
            text={activeIdea ? activeIdea.text : ""}
            id={id}
            setEnableCustomControls={setEnableCustomControls}
          />
        ) : (
          <>
            <ThreeDImage
              id={id}
              hover={hover}
              scale={scale}
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
