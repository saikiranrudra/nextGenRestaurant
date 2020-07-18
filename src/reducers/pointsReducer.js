export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_POINT_VALUE":
      return action.payload;
    default:
      return state;
  }
};
