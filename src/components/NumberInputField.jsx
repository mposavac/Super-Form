import React from "react";

export default function NumberInputField(props) {
  return (
    <div className="input-field">
      <input
        type="number"
        required
        min="0"
        name={props.itemDetails.name}
        placeholder={props.itemDetails.placeholder}
        onChange={props.handleInput}
        value={props.input}
        id={props.multipleIndicator && props.multipleIndicator}
      />
      <div className="border-line" />
    </div>
  );
}
