import React, { Suspense, useEffect, useState } from "react";

export default function Header({
  viewModeButton,
  activeIdea,
  setIsListModeActive,
  isListModeActive,
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
      <button
        style={{ display: "flex", width: "auto" }}
        onClick={() => setIsListModeActive(!isListModeActive)}
      >
        {viewModeButton}
      </button>
      <h4
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          //position: "absolute",
          //top: "10px",
          //left: "50%",
          //transform: "translate(-50%, -50%)",
          width: "auto",
        }}
      >
        {activeIdea ? activeIdea.title : ""}
      </h4>
    </div>
  );
}
