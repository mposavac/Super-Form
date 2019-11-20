import React from "react";

export default function SelectionInputField(props) {
  if (props.input === "") props.handleInput(props.itemDetails.options[0]);
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div className="selection-input-contatiner">
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
    </React.Fragment>
  );
}
