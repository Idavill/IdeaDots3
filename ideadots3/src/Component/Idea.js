import React, { useEffect, useState, useContext } from "react";
import { SphereContext } from "./SphereContextProvider";
import UploadAndDisplayImage from "./UploadAndDisplayImage";

export default function Idea({
  s,
  i,
  setActive,
  activeI,
  deleteThis,
  gizmo,
  setGizmo,
  sphereArray,
  setSphereArray,
  setTitleIsChanged,
  setTitleChangeId,
}) {
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null); // TOOD: or s.img?
  const [title, setTitle] = useState(s.title);
  const [text, setText] = useState(s.text);
  const context = useContext(SphereContext);
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("TESTSSS", s.id);
  }, [s]);

  useEffect(() => {
    console.log("IMG HAS CHANGED", img);
  }, [img]);

  useEffect(() => {
    const titleId = s.id + "title";
    const textId = s.id + "text";

    const localStorageTitle = localStorage.getItem(titleId);
    const localStorageText = localStorage.getItem(textId);

    if (localStorageTitle) {
      setTitle(localStorageTitle);
    } else {
      setTitle(s.title);
    }

    if (localStorageText) {
      setText(localStorageText);
    } else {
      setText(s.text);
    }

    console.log("test ", images);
  }, []);

  useEffect(() => {
    if (
      activeI &&
      activeI.x === s.position.x &&
      activeI.y === s.position.y &&
      activeI.z === s.position.z
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeI]);

  //TODO: test this method especially if e is updated data
  const handleGo = () => {
    context.spheres.forEach((e) => {
      if (e.id == s.id) {
        setActive(e);
      }
    });
  };

  const handleRemoveIdea = () => {
    deleteThis(s);
  };

  //TODO: WHen title is edited, then context should
  const editTitle = (id, textContext) => {
    setIsActive(true);
    const titleId = id + "title";
    localStorage.setItem(titleId, textContext);
    sphereArray.forEach((sp) => {
      if (sp.id == id) {
        sp.title = textContext;
      }
    });

    setSphereArray(sphereArray);
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
    if (gizmo) {
      setGizmo(null);
    } else {
      setGizmo(s.id);
    }
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
        onDoubleClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }}
        onInput={(e) => editTitle(s.id, e.currentTarget.textContent)}
      >
        {title}
      </h4>
      <p
        contenteditable="true"
        onDoubleClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }}
        onInput={(e) => editText(s.id, e.currentTarget.textContent)}
      >
        {text}
      </p>
      <UploadAndDisplayImage ideaId={s.id} displayButtons={true} />
      <div className="IdeaButtons">
        <button type="button" onClick={handleGo} class="btn btn-light">
          Go
        </button>
        <button
          type="button"
          onClick={handleMoveClicked}
          class="btn btn-light headerButton"
        >
          Move
        </button>
        <button
          type="button"
          onClick={handleRemoveIdea}
          class="btn btn-light headerButton"
        >
          -
        </button>
      </div>
    </div>
  );
}
