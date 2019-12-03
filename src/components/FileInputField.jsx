import React from "react";

export default function FileInputField({ itemDetails, handleInput }) {
  return (
    <React.Fragment>
      <h2>{itemDetails.placeholder}</h2>
      <div className="file-input-container">
        <label htmlFor={itemDetails.name} className="file-upload-btn">
          <i className="fas fa-upload" />
          {itemDetails.multiple ? "Choose File" : "Choose Files"}
        </label>
        <input
          type="file"
          name={itemDetails.name}
          id={itemDetails.name}
          multiple={itemDetails.multiple}
          accept=".jpg, .jpeg, .png, .bmp"
          onChange={handleInput}
        />
      </div>
    </React.Fragment>
  );
}
