import React from "react";

export default function TextInputField(props) {
  return (
    <div>
      <input
        type="text"
        required
        name={props.itemDetails.name}
        placeholder={props.itemDetails.placeholder}
        onChange={props.handleInput}
        value={props.input}
      />
    </div>
  );
}
