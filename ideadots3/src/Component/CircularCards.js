import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Card = ({ focusLabel, position, lookAt }) => {
  const ref = useRef();

  useEffect(() => {
    console.log("CARD: FOCUS LABEL : ", focusLabel);
  }, [focusLabel]);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={ref} position={focusLabel ? position : [100, 100, 100]}>
      <planeGeometry args={[0.5, 0.8]} /> {/* Adjust card size */}
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

const CircularCards = ({ focusLabel, pos, count = 6, radius = 1 }) => {
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
      <group ref={groupRef} position={pos}>
        {cards.map((position, index) => (
          <Card focusLabel={focusLabel} key={index} position={position} />
        ))}
      </group>
    </>
  );
};
export default CircularCards;
