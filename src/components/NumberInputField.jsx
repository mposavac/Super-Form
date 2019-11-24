import React from "react";

export default function NumberInputField(props) {
  return (
    <div className="input-field">
      <input
        type="number"
        required
        min={props.itemDetails.range[0]}
        max={props.itemDetails.range[1]}
        maxLength={props.itemDetails.range[2]}
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
