import _ from "lodash";

export const selectCategories = (state = "all", action) => {
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
    case "ADD_CATEGORY": {
      state.push(action.payload);
      return [...state];
    }
    case "REMOVE_CATEGOR": {
      _.remove(state, (item) => item.id === action.payload.id);
      return [...state];
    }
  }
};
