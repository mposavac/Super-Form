import React, { Component } from "react";
import { connect } from "react-redux";

import inputs from "../assets/inputFields.json";

import MultipleInputField from "./MultipleInputField.jsx";

export class MultipleController extends Component {
  state = {
    numOfChilds: 0,
    allFilled: false
  };

  componentDidMount() {
    if (this.props.formData[this.props.itemDetails.name]) {
      this.setState(this.props.formData[this.props.itemDetails.name]);
    } else {
      let numOfChilds = this.props.formData[inputs[this.props.index - 1].name];
      this.setState({ numOfChilds: numOfChilds });
    }
  }

  handleInput = (payload, groupId) => {
    let stateName = "input" + groupId;
    this.setState({ [stateName]: payload });
  };
  handleNext = () => {
    this.props.addData(this.props.itemDetails.name, this.state);
    this.props.handleNext();
  };
  componentDidUpdate() {
    if (
      this.state.allFilled === false &&
      this.state[`input${this.state.numOfChilds - 1}`]
    )
      this.setState({ allFilled: true });
  }
  returnComponents = () => {
    let output = [];
    for (let i = 0; i < this.state.numOfChilds; i++) {
      output.push(
        <MultipleInputField
          key={i}
          itemDetails={this.props.itemDetails}
          handleInput={this.handleInput}
          input={this.state[`input${i}`]}
          groupId={i}
        />
      );
    }
    return <div className="multiple-input-container">{output}</div>;
  };
  render() {
    console.log("COTNROLER", this.state);
    return (
      <div>
        <h2>{this.props.itemDetails.placeholder}</h2>
        {this.state.numOfChilds && this.returnComponents()}
        <button
          className={!this.state.allFilled ? "hidden" : ""}
          onClick={this.handleNext}
        >
          OK <i className="fas fa-chevron-right" />
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    formData: state,
    index: state.index
  };
};
const mapStateToDispatch = dispatch => {
  return {
    addData: (key, value) =>
      dispatch({ type: "ADD_FORM_DATA", data: { key: key, value: value } })
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(MultipleController);
