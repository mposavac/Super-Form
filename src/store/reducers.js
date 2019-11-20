const formReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FORM_DATA":
      let newState = { ...state, [action.data.key]: action.data.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case "CHECK_LOCAL":
      let localState = localStorage.getItem("state");
      localState = JSON.parse(localState);
      return localState;
    default:
      return state;
  }
};

export default formReducer;
