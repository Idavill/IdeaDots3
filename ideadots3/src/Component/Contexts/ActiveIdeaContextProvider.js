import React, { createContext, useState, useEffect, useContext } from "react";

export const ActiveIdeaContext = createContext();

export const ActiveIdeaContextProvider = ({ children }) => {
  const [activeIdea, setActiveIdea] = useState(null);

  useEffect(() => {
    console.log("changes in active sphere: ", activeIdea);
  }, [activeIdea]);

  return (
    <ActiveIdeaContext.Provider value={{ activeIdea, setActiveIdea }}>
      {children}
    </ActiveIdeaContext.Provider>
  );
};

export const useActiveIdeaContext = () => useContext(ActiveIdeaContext);
