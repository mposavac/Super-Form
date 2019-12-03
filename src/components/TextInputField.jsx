import React from "react";

export default function TextInputField({ itemDetails, input, handleInput }) {
  const errorMsg = () => {
    let re;
    re = new RegExp(itemDetails.pattern);
    if (input && input.match(re) === null)
      return "Please don't use punctuation marks!";
    return undefined;
  };

  return (
    <div className="input-field">
      <input
        type="text"
        pattern={itemDetails.pattern}
        required
        name={itemDetails.name}
        placeholder={itemDetails.placeholder}
        onChange={handleInput}
        value={!input ? "" : input}
        autoComplete="off"
      />
      <div className="border-line" />
      {errorMsg() && <p className="error-msg">{errorMsg()}</p>}
    </div>
  );
}
