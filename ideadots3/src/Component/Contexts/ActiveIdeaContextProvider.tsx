import React, { PropsWithChildren, useState, useEffect, useContext } from "react";
import { IdeaType } from '../../Entities';

interface ActiveIdeaContextType {
  activeIdea: IdeaType | null;
  setActiveIdea: React.Dispatch<React.SetStateAction<IdeaType | null>>;
}

export const ActiveIdeaContext = React.createContext<ActiveIdeaContextType | null>(null);

export const ActiveIdeaContextProvider = ({children}:PropsWithChildren) => {
  const [activeIdea, setActiveIdea] = useState<IdeaType|null>(null);

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
