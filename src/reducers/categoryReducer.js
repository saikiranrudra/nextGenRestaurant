export const selectCategories = (state = "", action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export const categories = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MENU_CATEGORIES":
      return action.payload;
    default:
      return state;
  }
};
