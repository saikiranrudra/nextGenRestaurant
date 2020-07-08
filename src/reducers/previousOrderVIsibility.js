export default (state = true, action) => {
  switch (action.type) {
    case "PREVIOUS_ORDER_SET_VISIBLITY":
      return action.payload;
    default:
      return state;
  }
};
