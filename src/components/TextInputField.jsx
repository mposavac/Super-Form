import React from "react";

export default function TextInputField(props) {
  return (
    <div className="input-field">
      <input
        type="text"
        pattern={props.itemDetails.pattern}
        required
        name={props.itemDetails.name}
        placeholder={props.itemDetails.placeholder}
        onChange={props.handleInput}
        value={props.input}
        autoComplete="off"
      />
      <div className="border-line" />
    </div>
  );
}
