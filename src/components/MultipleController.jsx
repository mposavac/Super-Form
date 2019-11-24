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
    let { itemDetails, formData, index } = this.props;
    let numOfChilds = formData[inputs[index - 1].name];
    if (
      formData[itemDetails.name] &&
      formData[itemDetails.name].numOfChilds === numOfChilds
    ) {
      this.setState(formData[itemDetails.name]);
    } else {
      this.setState({ numOfChilds: numOfChilds });
    }
  }

  handleInput = (payload, groupId) => {
    let stateName = "input" + groupId;
    this.setState({ [stateName]: payload });
    if (payload) this.props.handleInput(this.state);
    else this.props.handleInput("");
  };
  componentDidUpdate() {
    let inputLength = 0;
    for (let i = 0; i < this.state.numOfChilds; i++) {
      if (this.state[`input${i}`]) inputLength++;
    }
    if (
      this.state.allFilled === false &&
      String(inputLength) === this.state.numOfChilds
    )
      this.setState({ allFilled: true });
    else if (
      this.state.allFilled === true &&
      String(inputLength) !== this.state.numOfChilds
    )
      this.setState({ allFilled: false });
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
    return (
      <div>
        <h2>
          {this.props.itemDetails.placeholder}
          {this.state.numOfChilds > 1 && window.innerWidth < 650 && (
            <span>(Scroll right)</span>
          )}
        </h2>
        {this.state.numOfChilds && this.returnComponents()}
        <button className={!this.state.allFilled ? "hidden" : ""} type="submit">
          OK <i className="fas fa-chevron-right" />
        </button>
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

export default connect(mapStateToProps)(MultipleController);
