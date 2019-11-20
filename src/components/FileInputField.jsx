import React from "react";

export default function FileInputField(props) {
  return (
    <div>
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
  );
}
