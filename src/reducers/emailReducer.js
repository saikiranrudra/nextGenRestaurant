export default (state = "", action) => {
  if (action.type === "LOGIN_EMAIL") {
    return action.payload;
  } else {
    return state;
  }
};
