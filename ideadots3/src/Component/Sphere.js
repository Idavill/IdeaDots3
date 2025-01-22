import React, { useEffect, useRef, useState, useContext } from "react";
import * as THREE from "three";
import ThreeDDot from "./ThreeDDot.js";
import { useControls } from "leva";
import { Vector3, Quaternion, Vector3 as ThreeVector3 } from "three";
import { PivotControls, Billboard, Text, Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // Ensure this import is correct
import ThreeDImage from "./ThreeDImage.js";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider.js";
import { ImageContext } from "./ImageContextProvider";
import { SphereContext } from "./SphereContextProvider.js";

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
  const ref = useRef();
  const { attach } = useControls({ attach: false });
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

  //TODO: insteda useeffect
  // useFrame(() => {
  //   if (controlsRef.current) {
  //     setDistanceFactorForZoom(controlsRef.current.object.position); // OrbitControls object.zoom
  //   }
  // });

  useEffect(() => {
    const positionId = s.id + "position";
    const localStoragePosition = localStorage.getItem(positionId);
    //console.log("got positions from local? : ", localStoragePosition);
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

      // Use the matrixPosition directly
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

      //Directly update state
      //updateCurrentPosition([x, y, z]);

      setCurrentPositionChanged(true);
    }
  };

  const handleSavePositionToContext = (matrix) => {
    if (positiontest) {
      updateCurrentPosition(positiontest); // Sync positiontest to state
      //matrix.copy(matrix);
    }
  };

  return (
    <>
      <PivotControls
        object={attach ? ref : undefined}
        onDrag={(e) => handleSavePosition(e)}
        onDragEnd={(e) => handleSavePositionToContext()}
        matrix={matrix}
        //enabled={true}
        autoTransform={true}
        visible={attach}
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
