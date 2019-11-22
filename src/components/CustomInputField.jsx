import React from "react";

export default function CustomInputField(props) {
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div
        className={`custom-input-container${
          props.input !== "" ? " active" : ""
        }`}
      >
        <i
          className={`far fa-${props.itemDetails.icon}${
            props.input === "0" ? " selected" : ""
          }`}
          id="0"
          onClick={props.handleInput}
        />
        <i
          className={`far fa-${props.itemDetails.icon}${
            props.input === "1" ? " selected" : ""
          }`}
          id="1"
          onClick={props.handleInput}
        />
        <i
          className={`far fa-${props.itemDetails.icon}${
            props.input === "2" ? " selected" : ""
          }`}
          id="2"
          onClick={props.handleInput}
        />
        <i
          className={`far fa-${props.itemDetails.icon}${
            props.input === "3" ? " selected" : ""
          }`}
          id="3"
          onClick={props.handleInput}
        />
        <i
          className={`far fa-${props.itemDetails.icon}${
            props.input === "4" ? " selected" : ""
          }`}
          id="4"
          onClick={props.handleInput}
        />
      </div>
    </React.Fragment>
  );
}
