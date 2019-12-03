import React from "react";

export default function DateInputField({ input, itemDetails, handleInput }) {
  const errorMsg = () => {
    if (input && parseInt(input.substr(0, 4)) < 1900)
      return "Enter year higher than 1900!";
    if (input && parseInt(input.substr(0, 4)) > new Date().getFullYear())
      return "Enter a past date!";
    return undefined;
  };
  return (
    <React.Fragment>
      <h2>{itemDetails.placeholder}</h2>
      <div className="date-input-container">
        <input
          type="date"
          required
          name={itemDetails.name}
          placeholder="Date"
          min="1900-01-01"
          max={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
            new Date().getDate() < 10
              ? "0" + new Date().getDate()
              : new Date().getDate()
          }`}
          onChange={handleInput}
          value={!input ? "" : input}
        />
        {errorMsg() && <p className="error-msg">{errorMsg()}</p>}
      </div>
    </React.Fragment>
  );
}
