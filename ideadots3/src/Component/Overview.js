import React, { useEffect, useState } from "react";

export default function Overview({
  s,
  i,
  scrollToIdea,
  titleIsChanged,
  titleChangeId,
}) {
  const [title, setTitle] = useState(s.title);

  useEffect(() => {
    if (titleChangeId == s.id) {
      setTitle(s.title);
    }
  }, [titleIsChanged]);

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
          onClick={(e) => scrollToIdea(s, i)}
        >
          {title}
        </a>
      </li>
    </ul>
  );
}
