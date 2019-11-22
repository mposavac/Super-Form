const formReducer = (state = { index: 0 }, action) => {
  switch (action.type) {
    case "ADD_FORM_DATA":
      let newState = { ...state, [action.data.key]: action.data.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case "CHANGE_INDEX": {
      let newState = { ...state, index: action.data };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    }
    case "CHECK_LOCAL":
      if (localStorage.getItem("state") !== null) {
        let localState = localStorage.getItem("state");
        localState = JSON.parse(localState);
        return localState;
      }
      return state;
    case "SUBMIT_FORM":
      //SUBMIT
      localStorage.clear();
      return { index: 0 };
    default:
      return state;
  }
};

export default formReducer;
