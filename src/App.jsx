import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import TextInputField from "./components/TextInputField.jsx";
import NumberInputField from "./components/NumberInputField.jsx";
import DateInputField from "./components/DateInputField.jsx";
import RadioInputField from "./components/RadioInputField.jsx";
import SelectionInputField from "./components/SelectionInputField.jsx";
import RangeInputField from "./components/RangeInputField.jsx";
import CustomInputField from "./components/CustomInputField.jsx";
import FileInputField from "./components/FileInputField.jsx";

export class App extends Component {
  components = {
    Text: TextInputField,
    Number: NumberInputField,
    Date: DateInputField,
    Radio: RadioInputField,
    Selection: SelectionInputField,
    Range: RangeInputField,
    Custom: CustomInputField,
    File: FileInputField
  };

  state = {
    input: "",
    index: 7
  };

  handleInput = event => {
    let { index, input } = this.state;
    if (inputs[index].type === "Custom")
      this.setState({ input: event.target.id });
    else if (
      input === "" &&
      (inputs[index].type === "Radio" || inputs[index].type === "Selection")
    )
      this.setState({ input: event });
    else if (inputs[index].type === "Selection")
      this.setState({ input: event.target.getAttribute("name") });
    else this.setState({ input: event.target.value });
  };

  handleNext = event => {
    event.preventDefault();
    let { index } = this.state;
    if (this.state.index + 1 < inputs.length) {
      this.props.addData(inputs[index].name, this.state.input);
      this.setState({ index: index + 1, input: "" });
    } else console.log("ZAVRSEN UNOS");
  };

  handlePrev = () => {
    let { index } = this.state;
    if (index > 0)
      this.setState({
        index: index - 1,
        input: this.props.formData[inputs[this.state.index - 1].name]
      });
  };
  render() {
    console.log(this.state);
    const TagName = this.components[inputs[this.state.index].type];
    return (
      <div className="form-container">
        <form onSubmit={this.handleNext}>
          <div className="form-info">
            <i className="fas fa-arrow-left" onClick={this.handlePrev} />
            <p className="index-number">{this.state.index + 1}</p>
          </div>
          <div className="input-container">
            <TagName
              handleInput={this.handleInput}
              itemDetails={inputs[this.state.index]}
              input={this.state.input}
            />

            <button type="submit">OK</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE:", state);
  return {
    formData: state
  };
};

const mapStateToDispatch = dispatch => {
  return {
    addData: (key, value) =>
      dispatch({ type: "RESPONSE", data: { key: key, value: value } })
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(App);
