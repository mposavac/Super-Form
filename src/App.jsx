import React, { Component } from "react";
import { connect } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import NavBar from "./components/NavBar.jsx";
import Screen from "./screens/Screen.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SvgWave from "./components/SvgWave.jsx";
import FormSummary from "./components/FormSummary.jsx";

export class App extends Component {
  state = {
    animate: false,
    finished: false,
    color: "color1",
    font: "font1"
  };

  getObjectSize = () => {
    let size = 0;
    for (const key in this.props.formData) {
      size += Object.getOwnPropertyNames(this.props.formData[key]).length;
    }
    return size;
  };

  handleNext = payload => {
    this.setState({ animate: " next" });
    setTimeout(() => {
      let { screenIndex } = this.props;
      if (
        screenIndex === 1 &&
        payload["kidsQuestion1"] &&
        payload["kidsQuestion1"] === "No"
      ) {
        this.setState({ animate: false });
        this.props.changeIndex(3);
      } else if (screenIndex === 3) {
        this.setState({
          animate: false,
          finished: true
        });
        this.props.changeIndex(screenIndex + 1);
      } else {
        this.setState({
          animate: false
        });
        this.props.changeIndex(screenIndex + 1);
      }
    }, 400);
  };

  handlePrev = () => {
    this.setState({ animate: " prev" });
    setTimeout(() => {
      if (
        this.props.screenIndex === 3 &&
        this.props.formData[1]["kidsQuestion1"] &&
        this.props.formData[1]["kidsQuestion1"] === "No"
      ) {
        this.setState({ animate: false });
        this.props.changeIndex(1);
      } else {
        this.setState({
          animate: false
        });
        this.props.changeIndex(this.props.screenIndex - 1);
      }
    }, 400);
  };

  handleStyleChange = e => {
    this.setState({
      [e.target.getAttribute("class")]: e.target.getAttribute("name")
    });
  };

  handleRetake = () => {
    this.setState({ finished: false, animate: "next" });
    setTimeout(() => {
      this.setState({ animate: false });
      this.props.changeIndex(0);
    }, 400);
  };
  render() {
    return (
      <div className={`page-container ${this.state.color} ${this.state.font}`}>
        <NavBar handleStyleChange={this.handleStyleChange} />
        <main
          className={this.state.animate ? this.state.animate + "-animate" : ""}
        >
          <div className="form-info">
            <i
              className="fas fa-arrow-left"
              onClick={this.handlePrev}
              style={
                !this.props.screenIndex && this.props.screenIndex < 3
                  ? { opacity: 0, visibility: "hidden" }
                  : { opacity: 1, visibility: "visible" }
              }
            />
          </div>
          {this.props.screenIndex === 0 && (
            <Screen
              inputFields={inputs.slice(0, 13)}
              handleNext={this.handleNext}
              font={this.state.font}
              screenIndex={0}
            />
          )}
          {this.props.screenIndex === 1 && (
            <Screen
              inputFields={[inputs[13]]}
              handleNext={this.handleNext}
              font={this.state.font}
              screenIndex={1}
            />
          )}
          {this.props.screenIndex === 2 && (
            <Screen
              inputFields={inputs.slice(14, 27)}
              handleNext={this.handleNext}
              font={this.state.font}
              screenIndex={2}
            />
          )}
          {this.props.screenIndex === 3 && (
            <Screen
              inputFields={inputs.slice(27, 30)}
              handleNext={this.handleNext}
              font={this.state.font}
              screenIndex={3}
            />
          )}
          {this.props.screenIndex === 4 && (
            <FormSummary
              handleSubmit={this.props.submitForm}
              handleRetake={this.handleRetake}
              submited={this.props.submited}
            />
          )}
        </main>
        <ProgressBar
          progress={
            !this.state.finished
              ? (this.getObjectSize() / inputs.length) * 100
              : 100
          }
        />
        <SvgWave animate={this.state.animate} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData,
    screenIndex: state.index,
    submited: state.submited
  };
};

const mapStateToDispatch = dispatch => {
  return {
    changeIndex: newIndex => dispatch({ type: "CHANGE_INDEX", data: newIndex }),
    submitForm: () => dispatch({ type: "SUBMIT_FORM" })
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(App);
