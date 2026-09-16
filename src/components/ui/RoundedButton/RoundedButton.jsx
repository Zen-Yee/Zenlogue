import React from "react";
import "./RoundedButton.css";

function RoundedButton({ type = "button", text, ...rest }) {
  return (
    <button type={type} className="round-button" {...rest}>
      {text}
    </button>
  );
}

export default RoundedButton;
