import React from "react";

export default function SelectionInputField(props) {
  if (props.input === "") props.handleInput(props.itemDetails.options[0]);
  return (
    <div>
      <h2>{props.itemDetails.placeholder}</h2>
      <div>
        {props.itemDetails.options.map((element, i) => (
          <p
            className={`option${props.input === element ? " selected" : ""}`}
            key={i}
            name={element}
            onClick={props.handleInput}
          >
            {element}
          </p>
        ))}
      </div>
    </div>
  );
}
