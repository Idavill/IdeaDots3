import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className="btn btn-light headerButton">
      {text}
    </button>
  );
}
