import React from "react";

export default function RadioInputField(props) {
  if (props.input === "") props.handleInput(props.itemDetails.options[0]);
  return (
    <React.Fragment>
      <p>{props.itemDetails.placeholder}</p>
      <div className="radio-input-container">
        {props.itemDetails.options.map((element, i) => (
          <div key={i}>
            <input
              type="radio"
              name={props.itemDetails.name}
              value={element}
              onChange={props.handleInput}
              checked={props.input === element}
            />
            {element} <br />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
