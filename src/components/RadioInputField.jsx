import React from "react";

export default function RadioInputField({ input, itemDetails, handleInput }) {
  return (
    <React.Fragment>
      <h2>{itemDetails.placeholder}</h2>
      <div className="radio-input-container">
        {itemDetails.options.map((element, i) => (
          <label key={i}>
            <input
              type="radio"
              required
              name={itemDetails.name}
              value={element}
              onChange={handleInput}
              checked={input === element}
            />
            {element} <br />
          </label>
        ))}
      </div>
    </React.Fragment>
  );
}
