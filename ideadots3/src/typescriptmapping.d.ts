import { Object3D } from "three";
import {Model} from "./Components/MoodBoard/Model.tsx";
import { PrimitiveProps } from "@react-three/fiber";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            model: ReactThreeFiber.Node<typeof Object3D & JSX.IntrinsicElements['model'], typeof Object3D>
        }
    }
}