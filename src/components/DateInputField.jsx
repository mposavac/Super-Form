import React from "react";

export default function TextInputField(props) {
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div className="date-input-container">
        <input
          type="date"
          required
          name="date"
          min="1900-01-01"
          max={`${new Date().getFullYear()}-${new Date().getMonth() +
            1}-${new Date().getDate()}`}
          onChange={props.handleInput}
          value={props.input}
        />
      </div>
    </React.Fragment>
  );
}
