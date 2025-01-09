import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Card = ({ position, lookAt }) => {
  const ref = useRef();

  // Rotate the card to always face the camera
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1, 1.5]} /> {/* Adjust card size */}
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

const CircularCards = ({ pos, count = 6, radius = 3 }) => {
  const cards = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return [x, 0, z]; // y = 0 for cards on the ground plane
  });

  return (
    <>
      {cards.map((position, index) => (
        <Card key={index} position={position} />
      ))}
    </>
  );
};

// const App = () => (
//   <Canvas>
//     <ambientLight />
//     <pointLight position={[10, 10, 10]} />
//     <CircularCards count={10} radius={5} />
//   </Canvas>
// );

export default CircularCards;
