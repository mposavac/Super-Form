import React from "react";

export default function TextInputField(props) {
  return (
    <div className="input-field">
      <input
        type="text"
        required
        name={props.itemDetails.name}
        placeholder={props.itemDetails.placeholder}
        onChange={props.handleInput}
        value={props.input}
      />
      <div className="border-line" />
    </div>
  );
}
