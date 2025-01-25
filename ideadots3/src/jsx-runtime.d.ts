/// <reference types="@react-three/fiber" />

import { GroupProps, Object3DNode, PrimitiveProps } from '@react-three/fiber';
import { Object3D } from 'three';

declare global {
  declare namespace JSX {
    interface IntrinsicElements {
      grouping: GroupProps;
    }
  }
}

