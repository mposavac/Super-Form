import React from "react";

export default function ProgressBar(props) {
  return (
    <div className="progress-container">
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{ width: `${props.progress}%` }}
        ></div>
      </div>
      <p>{Math.floor(props.progress)}%</p>
    </div>
  );
}
