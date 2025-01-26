// import React, { useEffect, useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { useLoader } from "@react-three/fiber";

// function Scene() {
//   const obj = useLoader(
//     OBJLoader,
//     "../Assets/ideadots3/src/Assets/pommernsgade3.obj"
//   );
//   return <primitive object={obj} />;
// }

// useGLTF.preload("../Assets/ideadots3/src/Assets/pommernsgade3.obj");

// export default function Model(props) {
//   const groupRef = useRef();
//   const { nodes, materials } = useGLTF("../Assets/sphere.gltf");

//   useEffect(() => {
//     console.log("NODES: ", nodes);
//   }, [nodes]);

//   return (
//     <group ref={groupRef} {...props} dispose={null}>
//       {/* <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Curve007_1.geometry}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Curve007_2.geometry}
//       /> */}
//       <mesh>
//         <boxGeometry />
//         <meshStandardMaterial />
//       </mesh>
//     </group>
//   );
// }

// useGLTF.preload("../Assets/sphere.gltf");
