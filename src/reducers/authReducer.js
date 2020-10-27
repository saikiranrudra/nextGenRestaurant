export default (state = null, action) => {
  if (action.type === "AUTHENTICATION_AND_AUTHORIZATION") {
    return action.payload;
  } else {
    return state;
  }
};
