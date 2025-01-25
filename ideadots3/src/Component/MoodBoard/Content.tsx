import { useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "../Contexts/SphereContextProvider";
import Sphere from "./Sphere";
import { IdeaType } from "../../Entities";
import { Vector3 } from "three";

interface ContentProps {
  activeIdea: IdeaType;
  setActiveIdea: (idea: IdeaType) => void;
  zoom: boolean;
  setZoom: (bool: boolean) => void;
  setFocus: (ref: any) => void; // TODO: find type
  newSphere: Vector3; // or IdeaType;
  scrollToIdea: (idea: IdeaType, i: number) => void;
  gizmo: number;
  controlsRef: any; // TODO: find type
  setEnableCustomControls: (bool: boolean) => void;
  isThreeDModeActive: boolean;
  isListModeActive: boolean;
  isDotModeActive: boolean;
}

export default function Content({
  activeIdea,
  setActiveIdea,
  zoom,
  setZoom,
  setFocus,
  newSphere,
  scrollToIdea,
  gizmo,
  controlsRef,
  setEnableCustomControls,
  isThreeDModeActive,
  isListModeActive,
  isDotModeActive,
}: ContentProps) {
  const context = useContext(SphereContext);

  useEffect(() => {
    if (newSphere) {
      addNewSphere(newSphere);
    }
  }, [newSphere]);

  const addNewSphere = (ns: Vector3) => {
    // TODO: Check correct type for vector3
    const newS = {
      id: uuidv4(),
      position: { x: ns.x, y: ns.y, z: ns.z },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevSpheres) => [...(prevSpheres || []), newS]);
    const newSTitleID = newS.id + "title";
    const newSTextID = newS.id + "text";
    localStorage.setItem(newSTitleID, newS.title);
    localStorage.setItem(newSTextID, newS.text);
  };

  const sphereList = () => {
    const spheres = context.spheres || []; // Fallback to an empty array if undefined

    return spheres.map((s, i) => (
      <>
        <Sphere
          s={s}
          key={uuidv4()}
          id={s.id}
          amountOfSpheres={context.spheres?.length || null}
          //gizmo={gizmo}
          zoomToView={(
            focusRef: any // TODO: check type
          ) => (setZoom(!zoom), setFocus(focusRef), scrollToIdea(s, i))}
          position={[s.position.x, s.position.y, s.position.z]}
          //title={s.title}
          isThreeDModeActive={isThreeDModeActive}
          isDotModeActive={isDotModeActive}
          //controlsRef={controlsRef}
          setEnableCustomControls={(bool: boolean) =>
            setEnableCustomControls(bool)
          }
          activeIdea={activeIdea}
          setActiveIdea={(idea: IdeaType) => setActiveIdea(idea)}
          isListModeActive={isListModeActive}
        />
      </>
    ));
  };

  return <>{sphereList()} </>;
}
