import React from "react";

export default function NumberInputField(props) {
  return (
    <div>
      <input
        type="number"
        required
        min="0"
        name={props.itemDetails.name}
        placeholder={props.itemDetails.placeholder}
        onChange={props.handleInput}
        value={props.input}
      />
    </div>
  );
}
