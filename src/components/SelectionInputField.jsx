import React from "react";

export default function SelectionInputField({
  itemDetails,
  handleInput,
  input
}) {
  return (
    <React.Fragment>
      <h2>{itemDetails.placeholder}</h2>
      <div className="selection-input-contatiner">
        {itemDetails.options.map((element, i) => (
          <p
            className={`option${input === element ? " selected" : ""}`}
            key={i}
            type="selection"
            name={itemDetails.name}
            data-value={element}
            onClick={handleInput}
          >
            {element}
          </p>
        ))}
      </div>
    </React.Fragment>
  );
}
