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
    case "UPDATE_MENU": {
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
    default:
      return state;
  }
};
