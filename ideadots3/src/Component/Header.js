import React, { Suspense, useEffect, useState } from "react";
import Button from "./Button";

export default function Header({
  viewModeButton,
  activeIdea,
  setIsListModeActive,
  setIsThreeDModeActive,
  isListModeActive,
  viewSpatialModeButton,
  isThreeDModeActive,
}) {
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
        text={viewModeButton}
      />
      <Button
        onClick={() => setIsThreeDModeActive(!isThreeDModeActive)}
        text={viewSpatialModeButton}
      />
      <h4
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          width: "auto",
        }}
      >
        {activeIdea ? activeIdea.title : ""}
      </h4>
    </div>
  );
}
