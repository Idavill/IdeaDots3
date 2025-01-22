import React, { useState, useContext, useEffect } from "react";
import Draggable from "react-draggable";
import { Sphere } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Html, Line } from "@react-three/drei";
import { SphereContext } from "./SphereContextProvider";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider";
import ThreeDDotImage from "./ThreeDDotImage";

export default function ThreeDDot({
  s,
  position,
  id,
  setEnableCustomControls,
  filteredImages,
  currentPositionChanged,
}) {
  const [ideaPosition, setideaPosition] = useState([
    position[0] * 2,
    position[1] * 2,
    position[2] * 2,
  ]);
  //const [dotPosition, setDotPosition] = useState(position);
  const [hoverDot, setHoverDot] = useState(false);
  const [clicked, click] = useState(false);
  const sphereContext = useContext(SphereContext);
  const ideaContext = useContext(ActiveIdeaContext);
  const thisSphere = sphereContext.spheres.filter((s) => s.id === id); // pass prop down instead?
  const radius = 150;
  const [offset, setOffset] = useState([]);

  useEffect(() => {
    if (ideaContext.activeIdea) {
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
    setideaPosition([position[0] * 2, position[1] * 2, position[2] * 2]);
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
      setOffset((prev) => [...prev, [x, y]]);

      angle += angleDivision;
    }
  };

  useEffect(() => {
    if (clicked) {
      ideaContext.setActiveIdea(thisSphere[0]);
    }
  }, [clicked]);

  const handleClick = () => {
    click(true);
  };

  const dotImages = filteredImages.map((filename, i) => {
    return (
      <>
        <ThreeDDotImage
          filename={filename}
          filteredImages={filteredImages}
          offset={offset[i]}
          id={id}
          setEnableCustomControls={setEnableCustomControls}
          ideaId={id}
          position={ideaPosition} //iodeaPOsition
          scale={0.1}
          dimensions={[150, 150]}
        ></ThreeDDotImage>
        <Line
          points={[
            position,
            [ideaPosition[0], ideaPosition[1], ideaPosition[2]],
          ]}
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
                  //border: "2px solid #202035",
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
          <Sphere position={ideaPosition} scale={0.1}>
            <meshStandardMaterial color={"grey"} />
          </Sphere>{" "}
          {dotImages}
        </>
      )}
      <Sphere onClick={() => handleClick()} position={position} scale={0.2}>
        <meshStandardMaterial
          color={hoverDot || clicked ? "rgb(55, 52, 255)" : "grey"}
        />
      </Sphere>
    </>
  );
}
