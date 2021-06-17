export const SetAlertMessage = (dispatch, type, payload) => {
  dispatch({
    type: type,
    payload: payload,
  });
  setTimeout(() => {
    dispatch({ type: type, payload: "" });
  }, 5000);
};
