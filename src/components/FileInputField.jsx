import React from "react";

export default function FileInputField(props) {
  return (
    <React.Fragment>
      <h2>{props.itemDetails.placeholder}</h2>
      <div className="file-input-container">
        <input
          type="file"
          required
          name={props.itemDetails.name}
          id={props.itemDetails.name}
          multiple={props.itemDetails.multiple}
          accept=".jpg, .jpeg, .png .bmp"
          onChange={props.handleInput}
        />
      </div>
    </React.Fragment>
  );
}
