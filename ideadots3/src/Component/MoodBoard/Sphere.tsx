import React, { useEffect, useRef, useState, useContext } from "react";
import * as THREE from "three";
import ThreeDDot from "./ThreeDDot";
import { useControls } from "leva";
import { Vector3, Quaternion, Vector3 as ThreeVector3 } from "three";
import { PivotControls } from "@react-three/drei";
import ThreeDImage from "./ThreeDImage";
import { ActiveIdeaContext } from "../Contexts/ActiveIdeaContextProvider.js";
import { ImageContext } from "../Contexts/ImageContextProvider.js";
import { SphereContext } from "../Contexts/SphereContextProvider.js";
import { IdeaType, ImageType } from "../../Entities.js";

interface SphereProps {
  s: IdeaType;
  id: string;
  position: [x: number, y: number, z: number]; //{ x: number; y: number; z: number };
  zoomToView: (focusRef: any) => void; // TODO: check this type
  activeIdea: IdeaType;
  setActiveIdea: (idea: IdeaType) => void;
  setEnableCustomControls: (bool: boolean) => void;
  isThreeDModeActive: boolean;
  isListModeActive: boolean;
  isDotModeActive: boolean;
  amountOfSpheres: number | null;
}

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
}: SphereProps) {
  //const ref = useRef(null); // TODO: correct?
  const { gizmo } = useControls({ gizmo: false });
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [scale, setScale] = useState(3);
  const [currentPosition, updateCurrentPosition] =
    useState<[x: number, y: number, z: number]>(position);
  const [currentPositionChanged, setCurrentPositionChanged] = useState(false);
  const [distanceFactorForZoom, setDistanceFactorForZoom] = useState(10);
  const context = useContext(ImageContext);
  //const sphereContext = useContext(SphereContext);
  const ideaContext = useContext(ActiveIdeaContext);
  const matrix = new THREE.Matrix4();
  var positiontest: any; // TODO: find actual type
  const filteredImages: ImageType[] | undefined = context.imageSrcList?.filter(
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
      const lsposarr: [x: number, y: number, z: number] = [
        lspos.x,
        lspos.y,
        lspos.z,
      ];
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
    if (ideaContext?.activeIdea) {
      click(ideaContext.activeIdea.id === id ? true : false);
    }
  }, [ideaContext?.activeIdea]);

  const handleClick = (e: any) => {
    //TODO: correct type?
    if (isListModeActive) {
      zoomToView(e.object.position);
      ideaContext?.setActiveIdea(s);
    }
    click(!clicked);
  };

  const handleSavePosition = (matrix: any) => {
    //TODO: correct type?
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
        //object={gizmo ? ref : undefined} TODO: reintroduce?
        onDrag={(e) => handleSavePosition(e)}
        onDragEnd={() => handleSavePositionToContext()}
        matrix={matrix}
        //enabled={true}
        autoTransform={true}
        visible={gizmo}
        activeAxes={[true, true, true]}
        anchor={[position[0], position[1], position[2]]}
      >
        {isDotModeActive ? (
          <ThreeDDot
            filteredImages={filteredImages}
            s={s}
            //amountOfSpheres={amountOfSpheres}
            //activeIdea={activeIdea}
            //setActiveIdea={setActiveIdea}
            position={currentPosition}
            //text={s.text}
            id={id}
            setEnableCustomControls={setEnableCustomControls}
            currentPositionChanged={currentPositionChanged}
          ></ThreeDDot>
        ) : (
          <>
            <ThreeDImage
              filteredImages={filteredImages}
              //id={id}
              //hover={hover}
              dimensions={[150, 150]}
              scale={1}
              //setScale={(scale: number) => setScale(scale)}
              //setEnableCustomControls={setEnableCustomControls}
              onClick={(e: any) => handleClick(e)} // TODO: what type is event
              onPointerOver={(event: any) => (
                event.stopPropagation(), hover(true)
              )} // TODO:what type is e?
              onPointerOut={() => hover(false)}
              //ideaId={id}
              position={currentPosition}
              //distanceFactorForZoom={distanceFactorForZoom}
              isThreeDModeActive={isThreeDModeActive}
            ></ThreeDImage>
          </>
        )}
      </PivotControls>
    </>
  );
}
