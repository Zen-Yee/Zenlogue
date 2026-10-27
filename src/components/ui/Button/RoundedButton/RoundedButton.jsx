import React from "react";
import "./RoundedButton.css";

function RoundedButton(className="", props) {
  return (
    <button type={props.type} className={`${className} round-button`}>
      {props.text}
    </button>
  );
}

export default RoundedButton;
