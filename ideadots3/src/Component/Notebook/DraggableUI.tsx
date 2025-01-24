import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import { SphereContext } from "../SphereContextProvider";
import Idea from "./Idea";
import Overview from "../Overview";
import IdeaType from '..Entities';

interface DraggableUIProps{
  setActiveIdea:(isActive: boolean) => void;
  scrollToIdea:(sphere:IdeaType, id:number) => void;
  activeIdea: IdeaType;
  gizmo:number;
  setGizmo:(ideaId:number) => void;
  titleIsChanged:boolean;
  setTitleIsChanged:(titleIsChanged: boolean) => void;
}

export default function DraggableUI({
  setActiveIdea,
  scrollToIdea,
  activeIdea,
  gizmo,
  setGizmo,
  titleIsChanged,
  setTitleIsChanged,
}:DraggableUIProps) {
  const context = useContext(SphereContext);
  const [titleChangeId, setTitleChangeId] = useState("");

  useEffect(() => {
    if (titleIsChanged) {
      setTitleIsChanged(false);
    }
  }, [titleIsChanged]);

  const deleteIdea = (s) => {
    const newList = context.spheres.filter((sphere) => sphere.id !== s.id);
    context.setSpheres(newList);
  };

  const overview = () => {
    return context.spheres.map((s, i) => (
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
    const newS = {
      id: uuidv4(),
      position: { x: 0, y: 0, z: 0 },
      title: "New Idea",
      text: "New Idea Text",
      img: "",
    };
    context.setSpheres((prevs) => [...prevs, newS]);
    const newSTitleID = newS.id + "title";
    const newSTextID = newS.id + "text";
    localStorage.setItem(newSTitleID, newS.title);
    localStorage.setItem(newSTextID, newS.text);
  };

  const listContent = () => {
    return context.spheres.map((s, i) => (
      <Idea
        s={s}
        i={i}
        scrollToIdea={scrollToIdea}
        key={i}
        gizmo={gizmo}
        setGizmo={(e) => setGizmo(e)}
        activeIdea={activeIdea}
        setActiveIdea={(s) => setActiveIdea(s)}
        deleteIdea={(s) => deleteIdea(s)}
        setTitleIsChanged={(e) => setTitleIsChanged(e)}
        setTitleChangeId={(e) => setTitleChangeId(e)}
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
              <nav id="navbar-example2" class="navbar px-3 mb-3">
                <ul class="nav nav-pills">{overview()}</ul>
              </nav>
            </div>
            <div className="overviewContainer">
              {" "}
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example2"
                data-bs-root-margin="0px 0px -40%"
                data-bs-smooth-scroll="true"
                class="scrollspy-example p-3 rounded-2"
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
