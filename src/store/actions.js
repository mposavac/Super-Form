export const addData = payload => {
  return dispatch => {
    dispatch({ type: "RESPONSE", payload });
  };
};
