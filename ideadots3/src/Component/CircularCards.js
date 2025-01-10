import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, Billboard, Text } from "@react-three/drei";
import { easing, geometry } from "maath";
import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";

const Card = ({ focusLabel, position, lookAt, ...props }) => {
  const cardRef = useRef();

  useEffect(() => {
    console.log("CARD: FOCUS LABEL : ", focusLabel);
  }, [focusLabel]);

  useFrame(({ camera }) => {
    if (cardRef.current) {
      cardRef.current.lookAt(camera.position);
    }
  });

  return (
    <>
      {/* <mesh ref={cardRef} position={focusLabel ? position : [100, 100, 100]}>
        <planeGeometry args={[0.5, 0.8]} /> 
        <meshBasicMaterial color="orange" /></mesh>*/}

      <group {...props}>
        <Image
          position={focusLabel ? position : [100, 100, 100]}
          ref={cardRef}
          transparent
          radius={0.075}
          url={image}
          scale={[1.618, 1, 1]}
          //side={THREE.DoubleSide}
        />
      </group>
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

const CircularCards = ({
  focusLabel,
  pos,
  count = 10,
  radius = 3,
  ...props
}) => {
  const [hovered, hover] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    console.log("CIRCULAR CARDS: FOCUS LABEL : ", focusLabel);
  }, [focusLabel]);

  const cards = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
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
          />
        ))}
        <ActiveCard hovered={hovered} focusLabel={focusLabel} />
      </group>
    </>
  );
};
export default CircularCards;
