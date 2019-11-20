import React from "react";

export default function TextInputField(props) {
  console.log(
    `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
  );
  return (
    <div>
      <input
        type="date"
        required
        name="date"
        min="1900-01-01"
        max={`${new Date().getFullYear()}-${new Date().getMonth() +
          1}-${new Date().getDate()}`}
        placeholder={props.placeholder}
        onChange={props.handleInput}
        value={props.input}
      />
    </div>
  );
}
