import React, { useEffect, useState, useContext } from "react";
import { SphereContext } from "../Contexts/SphereContextProvider";
import UploadAndDisplayImage from "../UploadAndDisplayImage";
import { ActiveIdeaContext } from "../Contexts/ActiveIdeaContextProvider";
import { IdeaType } from "../../Entities";

interface IdeaProps {
  s: IdeaType;
  i: number;
  deleteIdea: (s: IdeaType) => void;
  gizmo: string | null;
  setGizmo: (ideaId: string) => void;
  setTitleIsChanged: (titleIsChanged: boolean) => void;
  scrollToIdea: (sphere: IdeaType, id: number) => void;
  setTitleChangeId: (id: string) => void;
}

export default function Idea({
  s,
  i,
  deleteIdea,
  gizmo,
  setGizmo,
  setTitleIsChanged,
  scrollToIdea,
  setTitleChangeId,
}: IdeaProps) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const sphereContext = useContext(SphereContext);
  const ideaContext = useContext(ActiveIdeaContext);

  useEffect(() => {
    const titleId = s.id + "title";
    const textId = s.id + "text";
    const localStorageTitle = localStorage.getItem(titleId);
    const localStorageText = localStorage.getItem(textId);

    setTitle(localStorageTitle ? localStorageTitle : s.title);
    setText(localStorageText ? localStorageText : s.text);
  }, []);

  useEffect(() => {
    if (ideaContext) {
      if (ideaContext.activeIdea?.id === s.id) {
        setIsActive(true);
        scrollToIdea(s, i);
      } else {
        setIsActive(false);
      }
    }
  }, [ideaContext]);

  const handleGo = () => {
    if (ideaContext) {
      ideaContext.setActiveIdea(s);
      setIsActive(true);
    }
  };

  const handleRemoveIdea = () => {
    deleteIdea(s);
  };

  //TODO: WHen title is edited, then context should
  const editTitle = (id: string, textContext: any) => {
    if (ideaContext && sphereContext) {
      ideaContext.setActiveIdea(s);
      setIsActive(true);
      const titleId = id + "title";
      localStorage.setItem(titleId, textContext);
      sphereContext.spheres?.forEach((sp) => {
        if (sp.id == id) {
          sp.title = textContext;
        }
      });
      setTitleIsChanged(true);
      setTitleChangeId(id);
    }
  };

  const editText = (id: string, textContext: string) => {
    if (ideaContext) {
      ideaContext.setActiveIdea(s);
      setIsActive(true);
      s.text = textContext;
      const textId = id + "text";
      localStorage.setItem(textId, textContext);
    }
  };

  const handleMoveClicked = () => {
    setGizmo(gizmo ? "" : s.id);
  };

  const handleClick = () => {
    if (ideaContext) {
      ideaContext.setActiveIdea(s);
    }
  };

  return (
    <div
      key={i}
      //onMouseOver={() => setIsActive(true)}
      //onMouseLeave={() => setIsActive(false)}
      onClick={handleClick}
      className="listcontent"
      style={{
        backgroundColor: isActive ? "rgb(55, 52, 255)" : "rgb(53, 53, 53)",
      }}
    >
      <h4
        id={`scrollspyHeading${i}`}
        contentEditable="true"
        onDoubleClick={handleSelectAllText()}
        onInput={(e) => editTitle(s.id, e.currentTarget.textContent)}
      >
        {title}
      </h4>
      <p
        contentEditable="true"
        onDoubleClick={handleSelectAllText()}
        onInput={(e: any) => editText(s.id, e.currentTarget.textContent)}
      >
        {text}
      </p>
      <div className="IdeaButtons">
        <UploadAndDisplayImage
          //handleGo={handleGo}
          //handleMoveClicked={handleMoveClicked}
          handleRemoveIdea={handleRemoveIdea}
          ideaId={s.id}
          //displayButtons={true}
        />
      </div>
    </div>
  );

  function handleSelectAllText() {
    return (e: any) => {
      const range = document.createRange();
      range.selectNodeContents(e.currentTarget);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.log("selection null");
      }
    };
  }
}
