import React from "react";

export default function CustomInputField(props) {
  console.log(props);
  return (
    <div className="input-container">
      <i
        className={`far fa-heart${props.input === "0" ? " selected" : ""}`}
        id="0"
        onClick={props.handleInput}
      />
      <i
        className={`far fa-heart${props.input === "1" ? " selected" : ""}`}
        id="1"
        onClick={props.handleInput}
      />
      <i
        className={`far fa-heart${props.input === "2" ? " selected" : ""}`}
        id="2"
        onClick={props.handleInput}
      />
      <i
        className={`far fa-heart${props.input === "3" ? " selected" : ""}`}
        id="3"
        onClick={props.handleInput}
      />
      <i
        className={`far fa-heart${props.input === "4" ? " selected" : ""}`}
        id="4"
        onClick={props.handleInput}
      />
    </div>
  );
}
