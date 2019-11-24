import React from "react";

export default function SvgWave(props) {
  return (
    <svg
      version="1.1"
      id="svg-wave"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1400 300"
      className={props.animate ? props.animate : ""}
    >
      <path
        className="st0"
        d="M0,230c200.5-75.3,360.5-82,470-74c210.7,15.4,307.5,90.4,543,107c163.3,11.5,298.7-11.8,387-33v70H0V230z"
      />
      <path
        className="st1"
        d="M0,230c200.5-75.3,360.5-82,470-74c210.7,15.4,307.5,90.4,543,107c163.3,11.5,298.7-11.8,387-33v70H0V230z"
      />
      <path
        className="st2"
        d="M0,230c200.5-75.3,360.5-82,470-74c210.7,15.4,307.5,90.4,543,107c163.3,11.5,298.7-11.8,387-33v70H0V230z"
      />
    </svg>
  );
}
