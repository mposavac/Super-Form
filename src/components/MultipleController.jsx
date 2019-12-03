import React, { Component } from "react";
import { connect } from "react-redux";

import NumberInputField from "./NumberInputField.jsx";

export class MultipleController extends Component {
  state = {
    kidAgeMin: "",
    kidAgeMax: "",
    maleKids: "",
    femaleKids: ""
  };

  componentDidMount() {
    let { formData } = this.props;
    if (formData[2] && formData[2][this.props.itemDetails.name])
      this.setState(formData[2][this.props.itemDetails.name]);
  }

  errorMsg = () => {
    const { maleKids, femaleKids } = this.state;
    if (
      this.props.prevInput &&
      maleKids !== "" &&
      femaleKids !== "" &&
      parseInt(maleKids) + parseInt(femaleKids) !==
        parseInt(this.props.prevInput)
    )
      return `Female and male sum must be ${this.props.prevInput}`;
    return undefined;
  };

  handleInput = e => {
    this.setState({ [e.target.getAttribute("name")]: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let { kidAgeMin, kidAgeMax, maleKids, femaleKids } = this.state;
      if (
        kidAgeMin !== "" &&
        kidAgeMax !== "" &&
        maleKids !== "" &&
        femaleKids !== ""
      )
        this.props.handleInput({
          name: this.props.itemDetails.name,
          state: this.state
        });
      else
        this.props.handleInput({
          name: this.props.itemDetails.name,
          state: ""
        });
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.itemDetails.placeholder}</h2>
        <div className="multiple-input-container">
          {this.props.itemDetails.additional_fields.map((element, i) => (
            <NumberInputField
              key={i}
              handleInput={this.handleInput}
              handleNext={this.handleNext}
              itemDetails={element}
              input={this.state[element.name]}
            />
          ))}
        </div>
        {this.errorMsg() && <p className="error-msg">{this.errorMsg()}</p>}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    formData: state.formData
  };
};
export default connect(mapStateToProps)(MultipleController);
