import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import NumberInputField from "./NumberInputField.jsx";

function MultipleController({ prevInput, itemDetails, handleInput }) {
  const [inputs, setInputs] = useState({
    kidAgeMin: "",
    kidAgeMax: "",
    maleKids: "",
    femaleKids: ""
  });

  const formData = useSelector(state => state.formData);

  useEffect(() => {
    if (formData[2] && formData[2][itemDetails.name])
      setInputs(formData[2][itemDetails.name]);
  }, [inputs, formData, itemDetails]);

  const handleInputs = useCallback(
    e => {
      setInputs({ ...inputs, [e.target.getAttribute("name")]: e.target.value });
      let { kidAgeMin, kidAgeMax, maleKids, femaleKids } = inputs;
      if (
        kidAgeMin !== "" &&
        kidAgeMax !== "" &&
        maleKids !== "" &&
        femaleKids !== ""
      )
        handleInput({ name: itemDetails.name, state: inputs });
      else
        handleInput({
          name: itemDetails.name,
          state: ""
        });
    },
    [inputs, itemDetails, handleInput]
  );

  const errorMsg = () => {
    if (
      prevInput &&
      inputs.maleKids !== "" &&
      inputs.femaleKids !== "" &&
      parseInt(inputs.maleKids) + parseInt(inputs.femaleKids) !==
        parseInt(prevInput)
    )
      return `Number of male and female children needs to be ${prevInput}!`;
    return undefined;
  };
  console.log(inputs);
  return (
    <div>
      <h2>{itemDetails.placeholder}</h2>
      <div className="multiple-input-container">
        {itemDetails.additional_fields.map((element, i) => (
          <NumberInputField
            key={i}
            handleInput={handleInputs}
            itemDetails={element}
            input={inputs[element.name]}
          />
        ))}
      </div>
      {errorMsg() && <p className="error-msg">{errorMsg()}</p>}
    </div>
  );
}

export default MultipleController;
