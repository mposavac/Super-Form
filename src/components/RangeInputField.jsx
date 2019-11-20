import React from "react";

export default function RangeInputField(props) {
  return (
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
  );
}
