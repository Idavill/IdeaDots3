import React, { useContext } from "react";
import Button from "./Button";
import { ActiveIdeaContext } from "./Contexts/ActiveIdeaContextProvider";
import { IdeaType } from "../Entities";

// Define the props type for the Header component
interface HeaderProps {
  modelListViewButtonText: string;
  setIsListModeActive: (isActive: boolean) => void;
  setIsThreeDModeActive: (isActive: boolean) => void;
  isListModeActive: boolean;
  spatialModeButtonText: string;
  isThreeDModeActive: boolean;
  dotModeButtonText: string;
  isDotModeActive: boolean;
  setIsDotModeActive: (isActive: boolean) => void;
}

export default function Header({
  modelListViewButtonText,
  setIsListModeActive,
  setIsThreeDModeActive,
  isListModeActive,
  spatialModeButtonText,
  isThreeDModeActive,
  dotModeButtonText,
  isDotModeActive,
  setIsDotModeActive,
}: HeaderProps) {
  // Type the context using the appropriate type from your context definition
  const ideaContext = useContext(ActiveIdeaContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Button
        onClick={() => setIsListModeActive(!isListModeActive)}
        text={modelListViewButtonText}
      />
      <Button
        onClick={() => setIsThreeDModeActive(!isThreeDModeActive)}
        text={spatialModeButtonText}
      />
      <Button
        onClick={() => setIsDotModeActive(!isDotModeActive)}
        text={dotModeButtonText}
      />
      <h4
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: "auto",
        }}
      >
        {ideaContext?.activeIdea ? ideaContext.activeIdea.title : ""}
      </h4>
    </div>
  );
}
