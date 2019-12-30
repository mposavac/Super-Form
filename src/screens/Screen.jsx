import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextInputField from "../components/TextInputField.jsx";
import NumberInputField from "../components/NumberInputField.jsx";
import DateInputField from "../components/DateInputField.jsx";
import RadioInputField from "../components/RadioInputField.jsx";
import SelectionInputField from "../components/SelectionInputField.jsx";
import RangeInputField from "../components/RangeInputField.jsx";
import CustomInputField from "../components/CustomInputField.jsx";
import FileInputField from "../components/FileInputField.jsx";
import MultipleController from "../components/MultipleController";

function Screen({ inputFields, nextScreen, screenIndex, font }) {
  const components = {
    Text: TextInputField,
    Number: NumberInputField,
    Date: DateInputField,
    Radio: RadioInputField,
    Selection: SelectionInputField,
    Range: RangeInputField,
    Custom: CustomInputField,
    File: FileInputField,
    Multiple: MultipleController
  };

  const [inputs, setInputs] = useState({});

  const formData = useSelector(state => state.formData);
  const dispatch = useDispatch();
  const addData = (index, value) =>
    dispatch({ type: "ADD_FORM_DATA", index: index, data: value });

  const allFilled = () => {
    let validInputs = 0;
    let containes_optional = false;
    for (let i = 0; i < inputFields.length; i++) {
      if (inputs[inputFields[i].name]) validInputs++;
      if (inputFields[i].type === "File") containes_optional = true;
    }
    if (inputs["photos"] || inputs["profileImg"]) validInputs--;
    if (containes_optional && validInputs === inputFields.length - 1)
      return true;
    else if (validInputs === inputFields.length) return true;
    return false;
  };

  const handleInput = useCallback(
    e => {
      if (e.target) {
        let name = e.target.getAttribute("name");
        let value = "";
        let type = e.target.getAttribute("type")
          ? e.target.getAttribute("type")
          : "";
        if (type === "file") value = e.target.files;
        else if (type === "custom") value = e.target.id;
        else if (type === "selection")
          value = e.target.getAttribute("data-value");
        else value = e.target.value;

        setInputs({ ...inputs, [name]: value });
      } else {
        let name = e.name;
        let value = e.state;
        setInputs({ ...inputs, [name]: value });
      }
    },
    [inputs]
  );

  const handleNext = e => {
    e.preventDefault();
    if (allFilled()) {
      addData(screenIndex, inputs);
      nextScreen(inputs);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (formData[screenIndex]) setInputs(formData[screenIndex]);
  }, [formData, screenIndex]);

  return (
    <form onSubmit={handleNext}>
      <div className="input-container">
        {inputFields &&
          inputFields.map((element, i) => {
            const TagName = components[element.type];
            return (
              <div
                className={
                  inputs[element.name] !== undefined
                    ? "form-component completed"
                    : "form-component"
                }
                key={i}
              >
                <TagName
                  handleInput={handleInput}
                  handleNext={handleNext}
                  itemDetails={element}
                  input={inputs[element.name]}
                  font={font}
                  prevInput={
                    element.type === "Multiple" &&
                    inputs["kidsNumber"] &&
                    inputs["kidsNumber"]
                  }
                />
              </div>
            );
          })}
      </div>

      <button disabled={!allFilled()} type="submit">
        Next <i className="fas fa-chevron-right" />
      </button>
    </form>
  );
}

export default Screen;
