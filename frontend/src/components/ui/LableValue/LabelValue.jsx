import React from "react";

function LabelValue(props) {
  return (
    <p>
      {props.title} : {props.content}
    </p>
  );
}

export default LabelValue;
