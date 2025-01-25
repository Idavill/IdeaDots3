import { useRef, useEffect } from "react";
import { GridHelper } from "three";
import { extend } from "@react-three/fiber";
import { GroupProps, Object3DNode } from "@react-three/fiber";
import { Mesh } from "three";
import { Object3D } from "three";

// Create our custom element
export class Grouping extends Object3D {}

// Extend so the reconciler will learn about it
extend({ Grouping });

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    Grouping: Object3DNode<Grouping, typeof Grouping>;
  }
}

<grouping />;
