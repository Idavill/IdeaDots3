import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, Billboard, Text } from "@react-three/drei";
import { easing, geometry } from "maath";
import { Html } from "@react-three/drei";
import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";

const Card = ({ i, hover, focusLabel, position, lookAt, ...props }) => {
  const cardRef = useRef();
  const [scale, setScale] = useState(1);

  useFrame(({ camera }) => {
    if (cardRef.current) {
      cardRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      <Html
        position={focusLabel ? position : [100, 100, 100]}
        distanceFactor={10}
      >
        <div
          onPointerOver={() => (hover(i), setScale(1.2))}
          onPointerLeave={() => (hover(null), setScale(1))}
          className="contentContainer"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="contentLabel">
            <img
              style={{
                height: "50px",
                width: "50px",
              }}
              src={image}
            ></img>
          </div>
        </div>
      </Html>
    </>
  );
};

const ActiveCard = ({ hovered, position, focusLabel, groupRef, ...props }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.material.zoom = 0.8;
    }
  }, [hovered]);

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp(ref.current.material, "zoom", 1, 0.5, delta);
      easing.damp(
        ref.current.material,
        "opacity",
        hovered !== null,
        0.3,
        delta
      );
    }
  });

  return (
    <>
      {focusLabel ? (
        <Billboard {...props}>
          <Text
            fontSize={0.5}
            position={[2.15, 3.85, 0]}
            anchorX="left"
            color="black"
          ></Text>

          <Image
            ref={ref}
            transparent
            radius={0.3}
            position={position}
            scale={[2, 2, 1]}
            rotation={[0, 0, 0]}
            url={image}
          />
        </Billboard>
      ) : null}
    </>
  );
};

// function Carousel({ radius = 1.4, count = 8, focusLabel, hover }) {
//   const cards = Array.from({ length: count }, (_, i) => (
//     <Card
//       key={i}
//       url={`/img${Math.floor(i % 10) + 1}_.jpg`}
//       position={[
//         Math.sin((i / count) * Math.PI * 2) * radius,
//         0,
//         Math.cos((i / count) * Math.PI * 2) * radius,
//       ]}
//       rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
//     />
//   ));

//   return (
//     <>
//       <group position={[0, 0, 0]} rotation={[0, 1, 0]}>
//         {cards.map((position, i) => (
//           <Card
//             // onPointerOver={(e) => (e.stopPropagation(), hover(i))}
//             // onPointerOut={() => hover(null)}
//             focusLabel={focusLabel}
//             key={i}
//             position={position}
//             hover={(i) => hover(i)}
//             i={i}
//           />
//         ))}
//       </group>
//     </>
//   );
// }

const CircularCards = ({ focusLabel, pos, count = 10, radius, ...props }) => {
  const [hovered, hover] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    console.log("CIRCULAR CARDS: FOCUS LABEL : ", focusLabel);
  }, [focusLabel]);

  const cards = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    //const angle = 180;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return [x, 0, z]; // y = 0 for cards on the ground plane
  });

  return (
    <>
      <group ref={groupRef} position={pos} rotation={[0, 1, 0]}>
        {cards.map((position, i) => (
          <Card
            onPointerOver={(e) => (e.stopPropagation(), hover(i))}
            onPointerOut={() => hover(null)}
            focusLabel={focusLabel}
            key={i}
            position={position}
            hover={(i) => hover(i)}
            i={i}
          />
        ))}
        <ActiveCard hovered={hovered} focusLabel={focusLabel} />
      </group>
    </>
  );
};
export default CircularCards;
