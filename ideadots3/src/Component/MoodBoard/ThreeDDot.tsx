import React, { useState, useContext, useEffect } from "react";
import Draggable from "react-draggable";
import { Sphere } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html, Line } from "@react-three/drei";
import { SphereContext } from "../Contexts/SphereContextProvider";
import { ActiveIdeaContext } from "../Contexts/ActiveIdeaContextProvider";
import ThreeDDotImage from "./ThreeDDotImage";
import { IdeaType, ImageType } from "../../Entities";
import { Vector3 } from "three";

interface ThreeDDot {
  s: IdeaType;
  position: [x: number, y: number, z: number];
  id: string;
  setEnableCustomControls: (bool: boolean) => void;
  filteredImages: ImageType[] | undefined;
  currentPositionChanged: boolean;
}

export default function ThreeDDot({
  s,
  position,
  id,
  setEnableCustomControls,
  filteredImages,
  currentPositionChanged,
}: ThreeDDot) {
  // const [ideaPosition, setideaPosition] = useState([
  //   position[0] * 2,
  //   position[1] * 2,
  //   position[2] * 2,
  // ]);
  const [ideaPosition, setideaPosition] = useState<Vector3>(
    new Vector3(position[0] * 2, position[1] * 2, position[2] * 2)
  );
  const [hoverDot, setHoverDot] = useState(false);
  const [clicked, click] = useState(false);
  const sphereContext = useContext(SphereContext);
  const ideaContext = useContext(ActiveIdeaContext);
  const thisSphere = sphereContext.spheres?.filter((s) => s.id === id); // pass prop down instead?
  const radius = 150;
  const [offset, setOffset] = useState<number[][]>([]);

  useEffect(() => {
    if (ideaContext?.activeIdea) {
      if (ideaContext.activeIdea.id === s.id) {
        click(true);
      } else {
        click(false);
      }
    }
  }, [ideaContext]);

  useEffect(() => {
    if (filteredImages) {
      calculateCircleDivision();
      console.log("filtered images inside dot: ", filteredImages);
    }
  }, [filteredImages]);

  useEffect(() => {
    console.log("position changed: ", position);
    setideaPosition(
      new Vector3(position[0] * 2, position[1] * 2, position[2] * 2)
    );
  }, [currentPositionChanged]);

  const calculateCircleDivision = () => {
    const circumference = radius * Math.PI * 2;
    const amount = filteredImages ? filteredImages.length + 1 : 1;
    console.log("amount: ", amount);

    console.log("circumference: ", circumference);
    const angleDivision = 360 / amount;
    console.log("angleDivision: ", angleDivision);

    let angle = 0;
    for (let i = 0; i < amount; i++) {
      const radians = (angle * Math.PI) / 180;
      const x = radius * Math.cos(radians);
      const y = radius * Math.sin(radians);
      console.log("x: ", x, " y: ", y);
      setOffset((prev: number[][]) => [...(prev || []), [x, y]]);

      angle += angleDivision;
    }
  };

  useEffect(() => {
    if (clicked) {
      if (thisSphere) {
        ideaContext?.setActiveIdea(thisSphere[0]);
      }
    }
  }, [clicked]);

  const handleClick = () => {
    click(true);
  };

  const dotImages = filteredImages?.map((filename, i) => {
    return (
      <>
        <ThreeDDotImage
          filename={filename}
          //filteredImages={filteredImages}
          offset={offset[i]}
          //id={id}
          //setEnableCustomControls={setEnableCustomControls}
          //ideaId={id}
          position={ideaPosition} //iodeaPOsition
          isThreeDModeActive={true} //TODO: correct value?
          scale={0.1}
          dimensions={[150, 150]}
        ></ThreeDDotImage>
        <Line
          points={[position, ideaPosition.x, ideaPosition.y, ideaPosition.z]}
          color="black"
          lineWidth={1}
          segments={false}
          dashed={false}
        />
      </>
    );
  });

  return (
    <>
      {clicked && (
        <>
          <Draggable>
            <Html position={ideaPosition} key={uuidv4()} distanceFactor={10}>
              <div
                style={{
                  display: "flex",
                  justifyItems: "center",
                  justifyContent: "center",
                  width: `${300}px`,
                  height: `${300}px`,
                  borderRadius: `${300 / 2}px`,
                  position: "absolute",
                  top: `-${300 / 2}px`,
                  left: `-${300 / 2}px`,
                }}
              ></div>
              <div
                style={{
                  border: "10px solid #202035",
                  backgroundColor: "#202035",
                  borderRadius: "25px",
                  position: "absolute",
                  height: "100px",
                  width: "200px",
                  overflowY: "scroll",
                  top: `${offset[offset.length - 1][1]}px`,
                  left: `${offset[offset.length - 1][0]}px`,
                }}
              >
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  {s.text}
                </p>
              </div>
            </Html>
          </Draggable>
          <Sphere position={ideaPosition} scale={0.1} material-color={"grey"}>
            {/* <meshStandardMaterial color={"grey"} /> */}
          </Sphere>{" "}
          {dotImages}
        </>
      )}
      <Sphere
        onClick={() => handleClick()}
        material-color={hoverDot || clicked ? "rgb(55, 52, 255)" : "grey"}
        position={position}
        scale={0.2}
      >
        {/* <meshStandardMaterial
          color={hoverDot || clicked ? "rgb(55, 52, 255)" : "grey"}
        /> */}
      </Sphere>
    </>
  );
}
