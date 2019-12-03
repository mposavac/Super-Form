import React from "react";

export default function NumberInputField({ input, itemDetails, handleInput }) {
  const errorMsg = () => {
    if (input && input.length < itemDetails.range[0].length)
      return `Enter at least ${itemDetails.range[0].length} digits!`;
    if (input && input > parseInt(itemDetails.range[1]))
      return `Maximum number is ${itemDetails.range[1]}.`;
    if (input && input < parseInt(itemDetails.range[0]))
      return "Please enter positive integer number!";
    return undefined;
  };

  return (
    <div className="input-field">
      <input
        type="number"
        required
        min={itemDetails.range[0]}
        max={itemDetails.range[1]}
        maxLength={itemDetails.range[2]}
        name={itemDetails.name}
        placeholder={itemDetails.placeholder}
        onChange={handleInput}
        value={!input ? "" : input}
      />
      <div className="border-line" />
      {errorMsg() && <p className="error-msg">{errorMsg()}</p>}
    </div>
  );
}
