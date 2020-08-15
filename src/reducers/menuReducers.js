import _ from "lodash";

const findAndUpdate = (old, newObj) => {
  let index = -1;
  old.forEach((e, i) => {
    if (e.id === newObj.id) {
      index = i;
    }
  });
  if (index !== -1) {
    old[index] = newObj;
    return [...old];
  } else {
    return [...old];
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_MENU_ITEMS":
      return action.payload;

    case "UPDATE_MENU_ITEM": {
      state = findAndUpdate(state, action.payload);
      return [...state];
    }

    case "UPDATE_MENU_BULK": {
      let items = action.payload;
      items.forEach((item) => {
        state = findAndUpdate(state, item);
      });
      return [...state];
    }

    case "UPDATE_MENU_ITEM_FEATURED": {
      state = findAndUpdate(state, action.payload);
      return [...state];
    }

    case "ADD_ITEM_TO_MENU": {
      state.push(action.payload);
      return [...state];
    }
    case "REMOVER_ITEM_FROM_MENU": {
      _.remove(state, (item) => item.id === action.payload.id);
      return [...state];
    }

    default:
      return state;
  }
};
