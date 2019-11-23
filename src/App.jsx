import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import NavBar from "./components/NavBar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
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
    else this.setState({ input: event.target.value });
    console.log("handleInputAPP", this.state);
  };

  handleNext = event => {
    if (event) event.preventDefault();
    let { index } = this.props;
    if (index + 1 < inputs.length) {
      this.setState({ animate: " next" });
      setTimeout(() => {
        this.props.addData(inputs[index].name, this.state.input);
        if (
          inputs[index].redirectTo &&
          this.state.input === inputs[index].redirectTo["if"]
        ) {
          this.setState({
            input: "",
            animate: false
          });
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
    } else {
      this.setState({ animate: " next" });
      setTimeout(() => {
        this.props.addData(inputs[index].name, this.state.input);
        this.setState({ animate: false, finished: true });
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

  render() {
    const { index } = this.props;
    const TagName = this.components[inputs[index].type];
    console.log("this.state APP:", this.state);
    return (
      <div className={`form-container ${this.state.color} ${this.state.font}`}>
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
                itemDetails={inputs[index]}
                input={this.state.input}
                handleNext={this.handleNext}
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
        <svg
          version="1.1"
          id="svg-wave"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1400 300"
        >
          <path
            className="st0"
            d="M556,149c174,49,241,125,447,117s412-71,412-71l-1,125l-1111-6l-315-1l-1-75C-13,238,382,100,556,149z"
          />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE:", state);
  return {
    formData: state,
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
