/// <reference types="@react-three/fiber" />

import { Object3DNode, PrimitiveProps } from '@react-three/fiber';
import { Object3D } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: PrimitiveProps;
    }
  }
}
