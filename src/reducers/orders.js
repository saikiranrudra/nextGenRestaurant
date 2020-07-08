export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PREVIOUS_ORDER":
      return action.payload;
    default:
      return state;
  }
};
