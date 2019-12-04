import React from "react";

export default function FormSummary(props) {
  return !props.submited ? (
    <div className="form-summary">
      <h2>You Completed Super Form click submit to submit it!</h2>
      <button onClick={props.handleSubmit}>
        SUBMIT
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  ) : (
    <div className="form-summary">
      <h2>Your Form is submited! Thank you!</h2>
      <button onClick={props.handleRetake}>Take this awesome form again</button>
    </div>
  );
}
