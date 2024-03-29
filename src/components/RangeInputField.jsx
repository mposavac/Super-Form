import React from "react";

export default function RangeInputField(props) {
  let screen;
  if (window.innerWidth < 1100 || props.font !== "font1")
    screen = window.innerWidth * 0.95 * 0.75 - 33;
  else screen = (window.innerWidth / 2) * 0.75 - 33;
  const translateIndicator =
    ((props.input === "" ? "0" : props.input) / props.itemDetails.range[1]) *
    screen;
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div className="range-input-container">
        <div className="range">
          <span>
            {props.itemDetails.range[0]} {props.itemDetails.unit}
          </span>
          <span>
            {props.itemDetails.range[1]} {props.itemDetails.unit}
          </span>
        </div>
        <div className="range-slider">
          <input
            type="range"
            required
            name={props.itemDetails.name}
            min={props.itemDetails.range[0]}
            max={props.itemDetails.range[1]}
            step={props.itemDetails.range[2]}
            onChange={props.handleInput}
            value={!props.input ? "0" : props.input}
          />
          <p
            className="indicator"
            style={{
              left: translateIndicator + "px"
            }}
          >
            {!props.input ? "0" : props.input}
            <span className="unit">{props.itemDetails.unit}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
