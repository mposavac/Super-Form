import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style/index.scss";

import inputs from "./assets/inputFields.json";

import NavBar from "./components/NavBar.jsx";
import Screen from "./screens/Screen.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import SvgWave from "./components/SvgWave.jsx";
import FormSummary from "./components/FormSummary.jsx";

function App() {
  const [animate, setAnimate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [color, setColor] = useState("color1");
  const [font, setFont] = useState("font1");

  const formData = useSelector(state => state.formData);
  const screenIndex = useSelector(state => state.index);
  const submited = useSelector(state => state.submited);

  const dispatch = useDispatch();
  const changeIndex = newIndex =>
    dispatch({ type: "CHANGE_INDEX", data: newIndex });
  const submitForm = () => dispatch({ type: "SUBMIT_FORM" });

  const getObjectSize = () => {
    let size = 0;
    for (const key in formData) {
      size += Object.getOwnPropertyNames(formData[key]).length;
    }
    return size;
  };

  const nextScreen = payload => {
    setAnimate(" next");
    setTimeout(() => {
      if (
        screenIndex === 1 &&
        payload["kidsQuestion1"] &&
        payload["kidsQuestion1"] === "No"
      ) {
        setAnimate(false);
        changeIndex(3);
      } else if (screenIndex === 3) {
        setAnimate(false);
        setFinished(true);
        changeIndex(screenIndex + 1);
      } else {
        setAnimate(false);
        changeIndex(screenIndex + 1);
      }
    }, 400);
  };

  const prevScreen = () => {
    setAnimate(" prev");
    setTimeout(() => {
      if (
        screenIndex === 3 &&
        formData[1]["kidsQuestion1"] &&
        formData[1]["kidsQuestion1"] === "No"
      ) {
        setAnimate(false);
        changeIndex(1);
      } else {
        setAnimate(false);
        changeIndex(screenIndex - 1);
      }
    }, 400);
  };

  const handleStyleChange = e => {
    if (e.target.getAttribute("class") === "font")
      setFont(e.target.getAttribute("name"));
    else setColor(e.target.getAttribute("name"));
  };

  const handleRetake = () => {
    setAnimate(" next");
    setFinished(false);
    setTimeout(() => {
      setAnimate(false);
      changeIndex(0);
    }, 400);
  };
  return (
    <div className={`page-container ${color} ${font}`}>
      <NavBar handleStyleChange={handleStyleChange} />
      <main className={animate ? animate + "-animate" : ""}>
        <div className="form-info">
          <i
            className="fas fa-arrow-left"
            onClick={prevScreen}
            style={
              !screenIndex && screenIndex < 3
                ? { opacity: 0, visibility: "hidden" }
                : { opacity: 1, visibility: "visible" }
            }
          />
        </div>
        {screenIndex === 0 && (
          <Screen
            inputFields={inputs.slice(0, 13)}
            nextScreen={nextScreen}
            font={font}
            screenIndex={0}
          />
        )}
        {screenIndex === 1 && (
          <Screen
            inputFields={[inputs[13]]}
            nextScreen={nextScreen}
            font={font}
            screenIndex={1}
          />
        )}
        {screenIndex === 2 && (
          <Screen
            inputFields={inputs.slice(14, 27)}
            nextScreen={nextScreen}
            font={font}
            screenIndex={2}
          />
        )}
        {screenIndex === 3 && (
          <Screen
            inputFields={inputs.slice(27, 30)}
            nextScreen={nextScreen}
            font={font}
            screenIndex={3}
          />
        )}
        {screenIndex === 4 && (
          <FormSummary
            handleSubmit={submitForm}
            handleRetake={handleRetake}
            submited={submited}
          />
        )}
      </main>
      <ProgressBar
        progress={!finished ? (getObjectSize() / inputs.length) * 100 : 100}
      />
      <SvgWave animate={animate} />
    </div>
  );
}

export default App;
