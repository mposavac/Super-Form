import React from "react";

export default function RangeInputField(props) {
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>

      <div>
        <input
          type="range"
          min={props.itemDetails.range[0]}
          max={props.itemDetails.range[1]}
          step={props.itemDetails.range[2]}
          onChange={props.handleInput}
          value={props.input}
        />
        <p>{props.input}</p>
      </div>
    </React.Fragment>
  );
}
