import React, { useEffect, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Button from "./Button";

export default function Idea({
  s,
  i,
  setActiveSphere,
  setActiveIdea,
  activePosition,
  deleteIdea,
  gizmo,
  setGizmo,
  setTitleIsChanged,
  setTitleChangeId,
}) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const context = useContext(SphereContext);

  useEffect(() => {
    const titleId = s.id + "title";
    const textId = s.id + "text";
    const localStorageTitle = localStorage.getItem(titleId);
    const localStorageText = localStorage.getItem(textId);

    setTitle(localStorageTitle ? localStorageTitle : s.title);
    setText(localStorageText ? localStorageText : s.text);
  }, []);

  useEffect(() => {
    setIsActive(activePositiondMatchesIdea() ? true : false);
  }, [activePosition]);

  function activePositiondMatchesIdea() {
    return (
      activePosition &&
      activePosition.x === s.position.x &&
      activePosition.y === s.position.y &&
      activePosition.z === s.position.z
    );
  }

  //TODO: test this method especially if e is updated data
  const handleGo = () => {
    context.spheres.forEach((contextSphere) => {
      if (contextSphere.id == s.id) {
        setActiveSphere(contextSphere);
        setActiveIdea(contextSphere);
      }
    });
  };

  const handleRemoveIdea = () => {
    deleteIdea(s);
  };

  //TODO: WHen title is edited, then context should
  const editTitle = (id, textContext) => {
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
    setIsActive(true);
    s.text = textContext;
    const textId = id + "text";
    localStorage.setItem(textId, textContext);
  };

  const handleMoveClicked = () => {
    setGizmo(gizmo ? null : s.id);
  };

  return (
    <div
      key={i}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
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
      <UploadAndDisplayImage ideaId={s.id} displayButtons={true} />
      <div className="IdeaButtons">
        <Button onClick={handleGo} text={"Go"} />
        <Button onClick={handleMoveClicked} text={"Move"} />
        <Button onClick={handleRemoveIdea} text={"-"} />
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
