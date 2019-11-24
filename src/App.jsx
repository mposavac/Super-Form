import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import NavBar from "./components/NavBar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SvgWave from "./components/SvgWave.jsx";
import FormSummary from "./components/FormSummary.jsx";
import TextInputField from "./components/TextInputField.jsx";
import NumberInputField from "./components/NumberInputField.jsx";
import DateInputField from "./components/DateInputField.jsx";
import RadioInputField from "./components/RadioInputField.jsx";
import SelectionInputField from "./components/SelectionInputField.jsx";
import RangeInputField from "./components/RangeInputField.jsx";
import CustomInputField from "./components/CustomInputField.jsx";
import FileInputField from "./components/FileInputField.jsx";
import MultipleController from "./components/MultipleController";

export class App extends Component {
  components = {
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

  state = {
    input: "",
    animate: false,
    finished: false,
    submited: false,
    errorMsg: undefined,
    color: "color1",
    font: "font1"
  };

  componentDidMount() {
    this.props.checkLocal();
  }

  handleInput = event => {
    let { index } = this.props;
    if (inputs[index].type === "Custom")
      this.setState({ input: event.target.id });
    else if (inputs[index].type === "Selection")
      this.setState({ input: event.target.getAttribute("name") });
    else if (inputs[index].type === "File")
      this.setState({ input: event.target.files });
    else if (inputs[index].type === "Multiple") this.setState({ input: event });
    else {
      if (event.target.validity.valid)
        this.setState({ input: event.target.value, errorMsg: undefined });
      else {
        let errMsg = this.checkErrors(event.target.value, index);
        this.setState({
          input: event.target.value,
          errorMsg: errMsg
        });
      }
    }
  };

  handleNext = event => {
    let { index } = this.props;
    event.preventDefault();
    if (inputs[index].type === "Multiple") {
      if (this.state.input !== "") {
        this.setState({ animate: " next" });
        setTimeout(() => {
          this.props.addData(inputs[index].name, this.state.input);
          this.setState({
            input: this.props.formData[inputs[index + 1].name]
              ? this.props.formData[inputs[index + 1].name]
              : "",
            animate: false
          });
          this.props.changeIndex(index + 1);
        }, 400);
      }
    } else if (event && event.type === "submit") {
      this.setState({ animate: " next" });
      setTimeout(() => {
        this.props.addData(inputs[index].name, this.state.input);
        if (index + 1 >= inputs.length)
          this.setState({ animate: false, finished: true });
        else if (
          inputs[index].redirectTo &&
          this.state.input === inputs[index].redirectTo["if"]
        ) {
          this.setState({
            input: "",
            animate: false
          });
          this.props.changeIndex(inputs[index].redirectTo["index"]);
        } else if (this.props.formData[inputs[index + 1].name]) {
          this.setState({
            input: this.props.formData[inputs[index + 1].name],
            animate: false
          });
          this.props.changeIndex(index + 1);
        } else {
          this.setState({ input: "", animate: false });
          this.props.changeIndex(index + 1);
        }
      }, 400);
    }
  };

  handlePrev = () => {
    let { index } = this.props;
    if (index > 0) {
      this.setState({ animate: " prev" });
      setTimeout(() => {
        if (
          inputs[index].redirectFrom &&
          this.props.formData[
            inputs[inputs[index].redirectFrom["index"]].name
          ] === inputs[index].redirectFrom["if"]
        ) {
          this.setState({
            input: "",
            animate: false
          });
          this.props.changeIndex(inputs[index].redirectFrom["index"]);
        } else {
          this.setState({
            input: this.props.formData[inputs[index - 1].name],
            animate: false
          });
          this.props.changeIndex(index - 1);
        }
      }, 400);
    }
  };

  handleStyleChange = e => {
    this.setState({
      [e.target.getAttribute("class")]: e.target.getAttribute("name")
    });
  };

  handleSubmit = () => {
    this.props.submitForm();
    this.setState({ input: "", submited: true });
  };

  handleRetake = () => {
    this.setState({ finished: false, submited: false });
  };

  checkErrors = (input, index) => {
    if (input === "") return "This field is required!";
    if (inputs[index].type === "Text")
      return "Please don't use punctuation marks!";
    if (inputs[index].type === "Number") {
      if (input.length < inputs[index].range[0].length)
        return `Enter at least ${inputs[index].range[0].length} digits!`;
      if (String(input.length) > inputs[index].range[2])
        return `Maximum is ${inputs[index].range[2]} digits.`;
      return "Please enter positive integer number!";
    }
    if (inputs[index].type === "Date") return "Enter year higher than 1900!";
    return "Please check input field!";
  };

  render() {
    const { index } = this.props;
    const TagName = this.components[inputs[index].type];
    return (
      <div className={`page-container ${this.state.color} ${this.state.font}`}>
        <NavBar handleStyleChange={this.handleStyleChange} />
        {!this.state.finished && index < inputs.length ? (
          <form onSubmit={this.handleNext}>
            <div className="form-info">
              <p className="index-number">Q{index + 1}</p>
              <i
                className="fas fa-arrow-left"
                onClick={this.handlePrev}
                style={
                  !index
                    ? { opacity: 0, visibility: "hidden" }
                    : { opacity: 1, visibility: "visible" }
                }
              />
            </div>
            <div
              className={`input-container${
                this.state.animate ? this.state.animate + "-animate" : ""
              }`}
            >
              <TagName
                handleInput={this.handleInput}
                handleNext={this.handleNext}
                itemDetails={inputs[index]}
                input={this.state.input}
                font={this.state.font}
              />
              <button
                className={this.state.input === "" ? "hidden" : ""}
                disabled={this.state.input === ""}
                type="submit"
                style={
                  inputs[index].type === "Multiple" ? { display: "none" } : {}
                }
              >
                OK <i className="fas fa-chevron-right" />
              </button>
              {this.state.errorMsg && (
                <p className="error-msg">{this.state.errorMsg}</p>
              )}
            </div>
          </form>
        ) : (
          <FormSummary
            handleSubmit={this.handleSubmit}
            handleRetake={this.handleRetake}
            submited={this.state.submited}
          />
        )}
        <ProgressBar
          progress={!this.state.finished ? (index / inputs.length) * 100 : 100}
        />
        <SvgWave animate={this.state.animate} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData,
    index: state.index
  };
};

const mapStateToDispatch = dispatch => {
  return {
    addData: (key, value) =>
      dispatch({ type: "ADD_FORM_DATA", data: { key: key, value: value } }),
    checkLocal: () => dispatch({ type: "CHECK_LOCAL" }),
    changeIndex: newIndex => dispatch({ type: "CHANGE_INDEX", data: newIndex }),
    submitForm: () => dispatch({ type: "SUBMIT_FORM" })
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(App);
