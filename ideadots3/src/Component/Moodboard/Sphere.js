import React, { useEffect, useRef, useState, useContext } from "react";
import * as THREE from "three";
import ThreeDDot from "./ThreeDDot.js";
import { useControls } from "leva";
import { Vector3, Quaternion, Vector3 as ThreeVector3 } from "three";
import { PivotControls } from "@react-three/drei";
import ThreeDImage from "./ThreeDImage.js";
import { ActiveIdeaContext } from "../Contexts/ActiveIdeaContextProvider.js";
import { ImageContext } from "../Contexts/ImageContextProvider";
import { SphereContext } from "../Contexts/SphereContextProvider.js";

export default function Sphere({
  s,
  id,
  position,
  zoomToView,
  activeIdea,
  setActiveIdea,
  setEnableCustomControls,
  isThreeDModeActive,
  isListModeActive,
  isDotModeActive,
  amountOfSpheres,
}) {
  const ref = useRef();
  const { gizmo } = useControls({ gizmo: false });
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [scale, setScale] = useState(3);
  const [currentPosition, updateCurrentPosition] = useState(position);
  const [currentPositionChanged, setCurrentPositionChanged] = useState(false);
  const [distanceFactorForZoom, setDistanceFactorForZoom] = useState(10);
  const context = useContext(ImageContext);
  const sphereContext = useContext(SphereContext);
  const ideaContext = useContext(ActiveIdeaContext);
  const matrix = new THREE.Matrix4();
  var positiontest;
  const filteredImages = context.imageSrcList.filter(
    (img) => img.id === id // TODO: move this computation to parent
  );

  useEffect(() => {
    const positionId = s.id + "position";
    const localStoragePosition = localStorage.getItem(positionId);
    if (localStoragePosition) {
      const lspos = JSON.parse(localStoragePosition);
      const lsposarr = [lspos.x, lspos.y, lspos.z];
      updateCurrentPosition(lsposarr);
      setCurrentPositionChanged(true);
    } else {
      setCurrentPositionChanged(false);
    }
  }, []);

  useEffect(() => {
    console.log("current position: ", currentPosition);
  }, [currentPosition]);

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

  const handleSavePosition = (matrix) => {
    if (matrix) {
      const positionId = s.id + "position";
      const matrixPosition = new Vector3();
      const rotation = new Quaternion();
      const scale = new ThreeVector3();

      matrix.decompose(matrixPosition, rotation, scale);

      const x = currentPosition[0] + matrixPosition.x;
      const y = currentPosition[1] + matrixPosition.y;
      const z = currentPosition[2] + matrixPosition.z;
      positiontest = [x, y, z];

      localStorage.setItem(
        positionId,
        JSON.stringify({
          x,
          y,
          z,
        })
      );
      setCurrentPositionChanged(true);
    }
  };

  const handleSavePositionToContext = () => {
    if (positiontest) {
      updateCurrentPosition(positiontest);
    }
  };

  return (
    <>
      <PivotControls
        object={gizmo ? ref : undefined}
        onDrag={(e) => handleSavePosition(e)}
        onDragEnd={(e) => handleSavePositionToContext()}
        matrix={matrix}
        autoTransform={true}
        visible={gizmo}
        activeAxes={[true, true, true]}
        anchor={[position.x, position.y, position.z]}
      >
        {isDotModeActive ? (
          <ThreeDDot
            filteredImages={filteredImages}
            s={s}
            amountOfSpheres={amountOfSpheres}
            activeIdea={activeIdea}
            setActiveIdea={setActiveIdea}
            position={currentPosition}
            text={s.text}
            id={id}
            setEnableCustomControls={setEnableCustomControls}
            currentPositionChanged={currentPositionChanged}
          ></ThreeDDot>
        ) : (
          <>
            <ThreeDImage
              filteredImages={filteredImages}
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
              position={currentPosition}
              distanceFactorForZoom={distanceFactorForZoom}
              isThreeDModeActive={isThreeDModeActive}
            ></ThreeDImage>
          </>
        )}
      </PivotControls>
    </>
  );
}
