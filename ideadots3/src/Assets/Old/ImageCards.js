// import * as THREE from "three";
// import { useLayoutEffect, useMemo, useRef, useState } from "react";
// import { Canvas, extend, useFrame } from "@react-three/fiber";
// import {
//   Image,
//   //ScrollControls,
//   //useScroll,
//   Billboard,
//   Text,
// } from "@react-three/drei";
// import { Html } from "@react-three/drei";

// import { generate } from "random-words";
// import { easing, geometry } from "maath";
// import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";

// export default function Scene({ children, pos, ...props }) {
//   const ref = useRef();
//   const [hovered, hover] = useState(null);
//   const amount = 5;
//   const cardArray = [1, 2, 3];

//   return (
//     <group ref={ref} {...props}>
//       <Cards
//         cardArray={cardArray}
//         amount={amount}
//         rotation={[0, 0, 80]}
//         pos={pos}
//         category="spring"
//         from={0}
//         len={Math.PI / 4}
//         onPointerOver={hover}
//         onPointerOut={hover}
//       />
//       <ActiveCard hovered={hovered} />
//     </group>
//   );
// }

// function Cards({
//   category,
//   data,
//   amount,
//   from = 0,
//   len = Math.PI * 2,
//   radius = 5.25,
//   onPointerOver,
//   onPointerOut,
//   pos,
//   cardArray,
//   ...props
// }) {
//   const [hovered, hover] = useState(null);

//   const cards = () => {
//     return cardArray.map((s, i) => (
//       <Card
//         key={from + (i / amount) * len}
//         onPointerOver={(e) => (e.stopPropagation(), hover(i), onPointerOver(i))}
//         onPointerOut={() => (hover(null), onPointerOut(null))}
//         position={(0, 0, 0)}
//         //   position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
//         //rotation={[0, Math.PI / 2 + angle, 0]}
//         rotation={[0, Math.PI / 2 + (from + (i / amount) * len), 0]}
//         active={hovered !== null}
//         hovered={hovered === i}
//         //url={`/img${Math.floor(i % 10) + 1}.jpg`}
//         url={image}
//       />
//     ));
//   };

//   return (
//     <group {...props}>
//       <Billboard position={[0, 0.5, 0]}></Billboard>
//       {cards()}
//     </group>
//   );
// }

// function Card({ url, active, hovered, ...props }) {
//   const ref = useRef();
//   useFrame((state, delta) => {
//     const f = hovered ? 1.4 : active ? 1.25 : 1;
//     easing.damp3(ref.current.position, [0, hovered ? 0.25 : 0, 0], 0.1, delta);
//     easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta);
//   });
//   return (
//     <group {...props}>
//       <Image
//         ref={ref}
//         transparent
//         radius={0.075}
//         url={url}
//         scale={[1.618, 1, 1]}
//         side={THREE.DoubleSide}
//       />
//     </group>
//   );
// }

// function ActiveCard({ hovered, ...props }) {
//   const ref = useRef();
//   const name = useMemo(() => generate({ exactly: 2 }).join(" "), [hovered]);
//   useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered]);
//   useFrame((state, delta) => {
//     easing.damp(ref.current.material, "zoom", 1, 0.5, delta);
//     easing.damp(ref.current.material, "opacity", hovered !== null, 0.3, delta);
//   });
//   return (
//     <Billboard {...props}>
//       <Text
//         fontSize={0.5}
//         position={[2.15, 3.85, 0]}
//         anchorX="left"
//         color="black"
//       >
//         {hovered !== null && `${name}\n${hovered}`}
//       </Text>

//       <Image
//         ref={ref}
//         transparent
//         radius={0.3}
//         position={[0, 1.5, 0]}
//         scale={[3.5, 1.618 * 3.5, 0.2, 1]}
//         // url={`/img${Math.floor(hovered % 10) + 1}.jpg`}
//         url={image}
//       />
//     </Billboard>
//   );
// }
