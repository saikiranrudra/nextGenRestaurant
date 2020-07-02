const findAndUpdate = (old, newObj) => {
  let index = -1;
  old.forEach((e, i) => {
    if (e.id === newObj.id) {
      index = i;
    }
  });
  if (index !== -1) {
    old[index] = newObj;
    return old;
  } else {
    return old;
  }
};
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_MENU_ITEMS":
      return action.payload;
    case "UPDATE_MENU": {
      if (state.length === 0) {
        return state;
      } else {
        state = findAndUpdate(state, action.payload);
        return [...state];
      }
    }
    default:
      return state;
  }
};
