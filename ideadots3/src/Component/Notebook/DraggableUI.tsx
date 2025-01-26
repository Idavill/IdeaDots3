import { useEffect, useState, useContext } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "../Contexts/SphereContextProvider";
import Idea from "./Idea";
import Overview from "./Overview";
import { IdeaType } from "../../Entities";

interface DraggableUIProps {
  //setActiveIdea:(isActive: boolean) => void;
  scrollToIdea: (sphere: IdeaType, id: number) => void;
  //activeIdea: IdeaType | null;
  gizmo: string | null;
  setGizmo: (ideaId: string) => void;
  titleIsChanged: boolean;
  setTitleIsChanged: (titleIsChanged: boolean) => void;
}

export default function DraggableUI({
  //setActiveIdea,
  scrollToIdea,
  //activeIdea,
  gizmo,
  setGizmo,
  titleIsChanged,
  setTitleIsChanged,
}: DraggableUIProps) {
  const context = useContext(SphereContext); // TODO: correct type?
  const [titleChangeId, setTitleChangeId] = useState("");

  useEffect(() => {
    if (titleIsChanged) {
      setTitleIsChanged(false);
    }
  }, [titleIsChanged]);

  const deleteIdea = (idea: IdeaType) => {
    const newList: IdeaType[] | undefined = context.spheres?.filter(
      (ideaElement: IdeaType) => ideaElement.id !== idea.id
    );
    if (newList) context.setSpheres(newList);
  };

  const overview = () => {
    return context.spheres?.map((s: IdeaType, i: number) => (
      <Overview
        s={s}
        i={i}
        scrollToIdea={scrollToIdea}
        titleIsChanged={titleIsChanged}
        titleChangeId={titleChangeId}
      ></Overview>
    ));
  };

  const handleAddIdea = () => {
    const newIdea = {
      id: uuidv4(),
      position: { x: 0, y: 0, z: 0 },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevs) => [...(prevs || []), newIdea]);

    const newSTitleID = newIdea.id + "title";
    const newSTextID = newIdea.id + "text";
    localStorage.setItem(newSTitleID, newIdea.title);
    localStorage.setItem(newSTextID, newIdea.text);
  };

  const listContent = () => {
    return context.spheres?.map((s: IdeaType, i: number) => (
      <Idea
        s={s}
        i={i}
        scrollToIdea={scrollToIdea}
        key={i}
        gizmo={gizmo}
        setGizmo={(gizmoId: string) => setGizmo(gizmoId)}
        //activeIdea={activeIdea}
        //setActiveIdea={(idea:IdeaType) => setActiveIdea(idea)}
        deleteIdea={(idea: IdeaType) => deleteIdea(idea)}
        setTitleIsChanged={(bool: boolean) => setTitleIsChanged(bool)}
        setTitleChangeId={(id: string) => setTitleChangeId(id)}
      ></Idea>
    ));
  };

  return (
    <>
      <Draggable>
        <div className="mainContainer">
          <div className="header"></div>
          <div className="contentContainer">
            <div className="overviewContainer">
              <nav id="navbar-example2" className="navbar px-3 mb-3">
                <ul className="nav nav-pills">{overview()}</ul>
              </nav>
            </div>
            <div className="overviewContainer">
              {" "}
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-root-margin="0px 0px -40%"
                data-bs-smooth-scroll="true"
                className="scrollspy-example p-3 rounded-2"
                tabIndex={0}
              >
                {listContent()}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
