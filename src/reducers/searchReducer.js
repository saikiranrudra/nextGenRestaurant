export const search = (state = "", action) => {
  if (action.type === "SET_SEARCH") {
    return action.payload;
  } else {
    return state;
  }
};

export default search;
