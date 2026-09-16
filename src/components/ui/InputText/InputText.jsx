import React from "react";
import "./InputText.css";

function InputText(props) {
  return (
    <label className="input-text-label">
      {props.label}
      <input
        className="input-text-field"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}

export default InputText;
