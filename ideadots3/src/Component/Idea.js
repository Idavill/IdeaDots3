import React, { useEffect, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider";

export default function Idea({
  s,
  i,
  deleteIdea,
  gizmo,
  setGizmo,
  setTitleIsChanged,
  scrollToIdea,
  setTitleChangeId,
}) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const context = useContext(SphereContext);
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
    if (ideaContext.activeIdea) {
      if (ideaContext.activeIdea.id === s.id) {
        setIsActive(true);
        scrollToIdea(s, i);
      } else {
        setIsActive(false);
      }
    }
  }, [ideaContext]);

  const handleGo = () => {
    ideaContext.setActiveIdea(s);
    setIsActive(true);
  };

  const handleRemoveIdea = () => {
    deleteIdea(s);
  };

  //TODO: WHen title is edited, then context should
  const editTitle = (id, textContext) => {
    ideaContext.setActiveIdea(s);

    setIsActive(true);
    const titleId = id + "title";
    localStorage.setItem(titleId, textContext);
    context.spheres.forEach((sp) => {
      if (sp.id == id) {
        sp.title = textContext;
      }
    });
    setTitleIsChanged(true);
    setTitleChangeId(id);
  };

  const editText = (id, textContext) => {
    ideaContext.setActiveIdea(s);

    setIsActive(true);
    s.text = textContext;
    const textId = id + "text";
    localStorage.setItem(textId, textContext);
  };

  const handleMoveClicked = () => {
    setGizmo(gizmo ? null : s.id);
  };

  const handleClick = () => {
    ideaContext.setActiveIdea(s);
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
        contenteditable="true"
        onDoubleClick={handleSelectAllText()}
        onInput={(e) => editTitle(s.id, e.currentTarget.textContent)}
      >
        {title}
      </h4>
      <p
        contenteditable="true"
        onDoubleClick={handleSelectAllText()}
        onInput={(e) => editText(s.id, e.currentTarget.textContent)}
      >
        {text}
      </p>
      <div className="IdeaButtons">
        <UploadAndDisplayImage
          handleGo={handleGo}
          handleMoveClicked={handleMoveClicked}
          handleRemoveIdea={handleRemoveIdea}
          ideaId={s.id}
          displayButtons={true}
        />
      </div>
    </div>
  );

  function handleSelectAllText() {
    return (e) => {
      const range = document.createRange();
      range.selectNodeContents(e.currentTarget);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    };
  }
}
