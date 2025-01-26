// import React, { useRef } from 'react'
// import { useGLTF, Mesh} from '@react-three/drei'
// //import { Group } from '@react-three/fiber'

// import { Group } from 'three';

// interface ModelProps {
//   filePath: string;
// }

// export default function Model({filePath}:ModelProps) {
//   const groupRef = useRef<Group>(null) // TODO: works?
//   const { nodes, materials } = useGLTF('/Poimandres.gltf')
//   return (
//     <group ref={groupRef} dispose={null}>
//       <Mesh castShadow receiveShadow geometry={nodes.Curve007_1.geometry} material={materials['Material.001']} />
//       <Mesh castShadow receiveShadow geometry={nodes.Curve007_2.geometry} material={materials['Material.002']} />
//     </group>
//   )
// }

// useGLTF.preload('/Poimandres.gltf')

import React from "react";
import {
  extend,
  LoaderProto,
  PrimitiveProps,
  useLoader,
} from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, SphereGeometry } from "three";
//import Sphere from "./Sphere";

interface ModelProps {
  filePath: string;
}

export const Model = ({ filePath }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, filePath);
  const scene: Group = gltf.scene as Group;

  // return <primitive object={scene} />;
  return <Sphere />;
};

extend({ Model });

// Extend JSX.IntrinsicElements to support 'primitive'
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       primitive: PrimitiveProps;
//     }
//   }
// }

// // // Extend JSX.IntrinsicElements to recognize the 'primitive' tag
// // declare global {
// //     namespace JSX {
// //       interface IntrinsicElements {
// //         primitive: React.ComponentProps<any> & { object: any };
// //       }
// //     }
// //   }

// // export default Model;

// // declare module "@react-three/fiber" {
// //   interface ThreeElements {
// //     primitive: PrimitiveProps;
// //   }
// // }

// // interface ModelProps {
// //   url: any;
// //   setNewSphere: (point: number) => void;
// // }

// // function Model({ url, setNewSphere }: ModelProps) {
// //     const { scene } = useGLTF(url) as { scene: THREE.Group }; // TODO: Rdo

// //     const handleDoubleClick = (e: any) => {
// //       // TODO : REDO
// //       console.log("double click", e.point);
// //       setNewSphere(e.point);
// //     };

// //     return <primitive object={scene} onDoubleClick={handleDoubleClick} />;
// //   }

// //
// // Create our custom element
// //class Model extends  {}

// // Extend so the reconciler will learn about it
// //   extend({ CustomElement })

// //   // Add types to ThreeElements elements so primitives pick up on it
// //   declare module '@react-three/fiber' {
// //     interface ThreeElements {
// //       customElement: Object3DNode<CustomElement, typeof CustomElement>
// //     }
// //   }

// //   // react-three-fiber will create your custom component and TypeScript will understand it
// //   <customComponent />
