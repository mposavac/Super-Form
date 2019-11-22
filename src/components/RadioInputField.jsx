import React from "react";

export default function RadioInputField(props) {
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div className="radio-input-container">
        {props.itemDetails.options.map((element, i) => (
          <label key={i}>
            <input
              type="radio"
              name={props.itemDetails.name + props.groupId ? props.groupId : ""}
              value={element}
              onChange={props.handleInput}
              checked={props.input === element}
              id={props.multipleIndicator && props.multipleIndicator}
            />
            {element} <br />
          </label>
        ))}
      </div>
    </React.Fragment>
  );
}
