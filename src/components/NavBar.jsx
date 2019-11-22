import React from "react";

export default function NavBar(props) {
  return (
    <nav>
      <div className="color-container">
        <div
          className="color"
          name="color1"
          onClick={props.handleStyleChange}
        />
        <div
          className="color"
          name="color2"
          onClick={props.handleStyleChange}
        />
        <div
          className="color"
          name="color3"
          onClick={props.handleStyleChange}
        />
        <div
          className="color"
          name="color4"
          onClick={props.handleStyleChange}
        />
        <div
          className="color"
          name="color5"
          onClick={props.handleStyleChange}
        />
      </div>
      <div className="font-container">
        <p className="font" name="font1" onClick={props.handleStyleChange}>
          A
        </p>
        <p className="font" name="font2" onClick={props.handleStyleChange}>
          A
        </p>
        <p className="font" name="font3" onClick={props.handleStyleChange}>
          A
        </p>
      </div>
      <i className="fas fa-chevron-down"></i>
    </nav>
  );
}
