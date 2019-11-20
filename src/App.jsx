import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import NavBar from "./components/NavBar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
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
    index: 0,
    animate: false,
    color: "color1",
    font: "font1"
  };

  componentDidMount() {
    this.props.checkLocal();
  }

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
    else if (inputs[index].type === "File")
      this.setState({ input: event.target.files });
    else this.setState({ input: event.target.value });
  };

  handleNext = event => {
    event.preventDefault();
    let { index } = this.state;
    if (index + 1 < inputs.length) {
      this.setState({ animate: " next" });
      setTimeout(() => {
        this.props.addData(inputs[index].name, this.state.input);
        if (
          inputs[index].required &&
          this.state.input === inputs[index].redirectTo["if"]
        )
          this.setState({
            index: inputs[index].redirectTo["index"],
            input: "",
            animate: false
          });
        else this.setState({ index: index + 1, input: "", animate: false });
      }, 400);
    } else console.log("ZAVRSEN UNOS");
  };

  handlePrev = () => {
    let { index } = this.state;
    if (index > 0) {
      this.setState({ animate: " prev" });
      setTimeout(() => {
        this.setState({
          index: index - 1,
          input: this.props.formData[inputs[this.state.index - 1].name],
          animate: false
        });
      }, 400);
    }
  };

  handleStyleChange = e => {
    this.setState({
      [e.target.getAttribute("class")]: e.target.getAttribute("name")
    });
  };
  render() {
    console.log(this.state);
    const TagName = this.components[inputs[this.state.index].type];
    return (
      <div className={`form-container ${this.state.color} ${this.state.font}`}>
        <NavBar handleStyleChange={this.handleStyleChange} />
        <form onSubmit={this.handleNext}>
          <div className="form-info">
            <i
              className="fas fa-arrow-left"
              onClick={this.handlePrev}
              style={!this.state.index ? { opacity: 0 } : { opacity: 1 }}
            />
            <p className="index-number">{this.state.index + 1}</p>
          </div>
          <div
            className={`input-container${
              this.state.animate ? this.state.animate + "-animate" : ""
            }`}
          >
            <TagName
              handleInput={this.handleInput}
              itemDetails={inputs[this.state.index]}
              input={this.state.input}
            />
            <button
              className={this.state.input === "" ? "hidden" : ""}
              disabled={this.state.input === ""}
              type="submit"
            >
              OK <i className="fas fa-chevron-right" />
            </button>
          </div>
        </form>
        <ProgressBar progress={(this.state.index / inputs.length) * 100} />
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
      dispatch({ type: "ADD_FORM_DATA", data: { key: key, value: value } }),
    checkLocal: () => dispatch({ type: "CHECK_LOCAL" })
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(App);
