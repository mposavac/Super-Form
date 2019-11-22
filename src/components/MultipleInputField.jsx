import React, { Component } from "react";
import { connect } from "react-redux";

import NumberInputField from "./NumberInputField.jsx";
import RadioInputField from "./RadioInputField.jsx";

export class MultipleInputField extends Component {
  state = {
    input1: "",
    input2: ""
  };
  componentDidMount() {
    if (this.props.input) {
      this.setState(this.props.input);
    }
  }
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  componentDidUpdate() {
    if (this.state.input1.length > 0 && this.state.input2.length > 0)
      this.props.handleInput(this.state, this.props.groupId);
  }
  render() {
    let { additional_fields } = this.props.itemDetails;
    return (
      <React.Fragment>
        <div>
          <NumberInputField
            handleInput={this.handleInput}
            itemDetails={additional_fields[0]}
            input={this.state.input1}
            multipleIndicator="input1"
            groupId={this.props.groupId}
          />
          <RadioInputField
            handleInput={this.handleInput}
            itemDetails={additional_fields[1]}
            input={this.state.input2}
            multipleIndicator="input2"
            groupId={this.props.groupId}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state,
    index: state.index
  };
};

export default connect(mapStateToProps)(MultipleInputField);
