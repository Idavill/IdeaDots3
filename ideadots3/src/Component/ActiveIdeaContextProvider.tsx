import React, { createContext, useState, useEffect, useContext } from "react";
import { Sphere } from '../Entities';

interface ActiveIdeaContextType {
  activeIdea: { title: string } | null;
  setActiveIdea: React.Dispatch<React.SetStateAction<Sphere | null>>;
}

export const ActiveIdeaContext = React.createContext<ActiveIdeaContextType | null>(null);

export const ActiveIdeaContextProvider = (/*{children}*/) => {
  const [activeIdea, setActiveIdea] = useState<Sphere|null>(null);

  useEffect(() => {
    console.log("changes in active sphere: ", activeIdea);
  }, [activeIdea]);

  return (
    <ActiveIdeaContext.Provider value={{ activeIdea, setActiveIdea }}>
      {/* {children} */}
    </ActiveIdeaContext.Provider>
  );
};

export const useActiveIdeaContext = () => useContext(ActiveIdeaContext);
