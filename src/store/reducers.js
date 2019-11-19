const initState = {
  data: "HEj"
};

const formReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESPONSE":
      return { ...state };
    default:
      return state;
  }
};

export default formReducer;
