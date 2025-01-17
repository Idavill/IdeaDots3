import React, { useEffect, useRef, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import { Html } from "@react-three/drei";
import { PivotControls, Billboard, Text } from "@react-three/drei";
import DisplayImage from "./DisplayImageThreeD.js";
import { useFrame } from "@react-three/fiber"; // Ensure this import is correct

export default function Sphere({
  id,
  position,
  zoomToView,
  gizmo,
  activeIdea,
  controlsRef,
  setEnableCustomControls,
}) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [pos, setPos] = useState(position);
  const meshRef = useRef();
  //const context = useContext(SphereContext);
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
    zoomToView(e.object.position);
    click(!clicked);
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
          onPointerOut={() => hover(false)}
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
          <>
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
          </>
        </mesh>
      </PivotControls>
    </>
  );
}
