import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Image, Billboard, Text } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { generate } from "random-words";
import { easing, geometry } from "maath";
import image from "/Users/idavilladsen/Desktop/IdeaDots3/ideadots3/src/Assets/material.jpg";

export default function ActiveCard({ focusLabel, hovered, ...props }) {
  const ref = useRef();
  const name = useMemo(() => generate({ exactly: 2 }).join(" "), [hovered]);
  useLayoutEffect(
    () => void (ref.current.material.zoom = focusLabel ? 0.8 : 0.0),
    [hovered]
  );
  useFrame((state, delta) => {
    focusLabel
      ? easing.damp(ref.current.material, "zoom", 1, 0.5, delta)
      : console.log("no easing");
    focusLabel
      ? easing.damp(
          ref.current.material,
          "opacity",
          hovered !== null,
          0.3,
          delta
        )
      : console.log("no easing");
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
          >
            {hovered !== null && `${name}\n${hovered}`}
          </Text>

          <Image
            ref={ref}
            transparent
            radius={0.3}
            position={[0, 1.5, 0]}
            scale={[3.5, 1.618 * 3.5, 0.2, 1]}
            // url={`/img${Math.floor(hovered % 10) + 1}.jpg`}
            url={image}
          />
        </Billboard>
      ) : null}
    </>
  );
}
