import React from "react";
import { connect } from "react-redux";

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <header className="App-header">NEW APP</header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    formData: state
  };
};

export default connect(mapStateToProps)(App);
