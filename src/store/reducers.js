const initState = {
};

const formReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESPONSE":
      return { ...state,  [action.data.key]:action.data.value};
    default:
      return state;
  }
};

export default formReducer;
