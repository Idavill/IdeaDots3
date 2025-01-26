import React, { useEffect, useState, useContext } from "react";
import { ActiveIdeaContext } from "../Contexts/ActiveIdeaContextProvider";

export default function Overview({
  s,
  i,
  scrollToIdea,
  titleIsChanged,
  titleChangeId,
}) {
  const [title, setTitle] = useState(s.title);
  const ideaContext = useContext(ActiveIdeaContext);

  useEffect(() => {
    if (titleChangeId == s.id) {
      setTitle(s.title);
    }
  }, [titleIsChanged]);

  const handleClick = () => {
    ideaContext.setActiveIdea(s);
    scrollToIdea(s, i);
  };

  useEffect(() => {
    const titleId = s.id + "title";
    const localStorageTitle = localStorage.getItem(titleId);
    setTitle(localStorageTitle ? localStorageTitle : s.title);
  }, []);

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a
          className="nav-link"
          href={`#scrollspyHeading${i}`}
          onClick={handleClick}
        >
          {title}
        </a>
      </li>
    </ul>
  );
}
