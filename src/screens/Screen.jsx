import React, { Component } from "react";
import { connect } from "react-redux";

import TextInputField from "../components/TextInputField.jsx";
import NumberInputField from "../components/NumberInputField.jsx";
import DateInputField from "../components/DateInputField.jsx";
import RadioInputField from "../components/RadioInputField.jsx";
import SelectionInputField from "../components/SelectionInputField.jsx";
import RangeInputField from "../components/RangeInputField.jsx";
import CustomInputField from "../components/CustomInputField.jsx";
import FileInputField from "../components/FileInputField.jsx";
import MultipleController from "../components/MultipleController";

export class Screen extends Component {
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

  state = {};

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState(this.props.formData[this.props.screenIndex]);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState(this.props.formData[this.props.screenIndex]);
    }
  }

  allFilled = () => {
    let validInputs = 0;
    let containes_optional = false;
    for (let i = 0; i < this.props.inputFields.length; i++) {
      if (this.state[this.props.inputFields[i].name]) validInputs++;
      if (this.props.inputFields[i].type === "File") containes_optional = true;
    }
    if (this.state["photos"] || this.state["profileImg"]) validInputs--;
    if (containes_optional && validInputs === this.props.inputFields.length - 1)
      return true;
    else if (validInputs === this.props.inputFields.length) return true;
    return false;
  };

  handleInput = e => {
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

      this.setState({ [name]: value });
    } else {
      let name = e.name;
      let value = e.state;
      this.setState({ [name]: value });
    }
  };

  handleNext = e => {
    e.preventDefault();
    if (this.allFilled()) {
      this.props.addData(this.props.screenIndex, this.state);
      this.props.handleNext(this.state);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleNext}>
        <div className="input-container">
          {this.props.inputFields &&
            this.props.inputFields.map((element, i) => {
              const TagName = this.components[element.type];
              return (
                <div
                  className={
                    this.state[element.name]
                      ? "form-component completed"
                      : "form-component"
                  }
                  key={i}
                >
                  <TagName
                    handleInput={this.handleInput}
                    handleNext={this.handleNext}
                    itemDetails={element}
                    input={this.state[element.name]}
                    font={this.props.font}
                    prevInput={
                      element.type === "Multiple" &&
                      this.state["kidsNumber"] &&
                      this.state["kidsNumber"]
                    }
                  />
                </div>
              );
            })}
        </div>

        <button className={!this.allFilled() ? "hidden" : ""} type="submit">
          OK <i className="fas fa-chevron-right" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData
  };
};

const mapStateToDispatch = dispatch => {
  return {
    addData: (index, value) =>
      dispatch({ type: "ADD_FORM_DATA", index: index, data: value })
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(Screen);
