import React, { Suspense, useEffect, useState, useContext } from "react";
import Button from "./Button";
import { ActiveIdeaContext } from "./ActiveIdeaContextProvider";

export default function Header({
  modelListViewButtonText,
  activeIdea,
  setIsListModeActive,
  setIsThreeDModeActive,
  isListModeActive,
  spatialModeButtonText,
  isThreeDModeActive,
  dotModeButtonText,
  setDotModeButtonText,
  isDotModeActive,
  setIsDotModeActive,
}) {
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
        {/* {activeIdea ? activeIdea.title : ""} */}
        {ideaContext.activeIdea ? ideaContext.activeIdea.title : ""}
      </h4>
    </div>
  );
}
