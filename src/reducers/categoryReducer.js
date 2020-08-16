import _ from "lodash";

export const selectCategories = (state = {}, action) => {
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
    case "ADD_CATEGORY": {
      state.push(action.payload);
      return [...state];
    }
    case "REMOVE_CATEGOR": {
      _.remove(state, (item) => item.id === action.payload.id);
      return [...state];
    }
    case "MODIFY_CATEGORY": {
      const index = _.findIndex(state, (item) => item.id === action.payload.id);
      state[index] = action.payload;
      return [...state];
    }
    default:
      return state;
  }
};
