const formReducer = (
  state = { index: 0, submited: false, formData: {} },
  action
) => {
  switch (action.type) {
    case "ADD_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, [action.index]: { ...action.data } }
      };
    case "CHANGE_INDEX": {
      return { ...state, submited: false, index: action.data };
    }
    case "SUBMIT_FORM":
      //SUBMIT formData
      return { ...state, submited: true, formData: {} };
    default:
      return state;
  }
};

export default formReducer;
