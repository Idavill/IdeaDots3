import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("../Assets/sphere.gltf");

  useEffect(() => {
    console.log("NODES: ", nodes);
  }, [nodes]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_1.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_2.geometry}
        material={materials["Material.002"]}
      /> */}
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("../Assets/sphere.gltf");
