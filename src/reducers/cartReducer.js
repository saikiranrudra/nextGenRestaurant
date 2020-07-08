const findAndUpdate = (old, newObj) => {
  let index = -1;

  old.forEach((e, i) => {
    if (e.id === newObj.id) {
      index = i;
    }
  });

  if (index !== -1) {
    if (newObj.jainCount !== undefined && newObj.normalCount !== undefined) {
      if (newObj.jainCount !== 0 || newObj.normalCount !== 0) {
        old.splice(index, 1);
        old.push(newObj);
        return [...old];
      } else {
        old.splice(index, 1);
        return [...old];
      }
    } else if (
      newObj.jainCount === undefined &&
      newObj.normalCount !== undefined
    ) {
      if (newObj.normalCount === 0) {
        old.splice(index, 1);
        return [...old];
      } else {
        old.splice(index, 1);
        old.push(newObj);
        return [...old];
      }
    } else if (
      newObj.jainCount !== undefined &&
      newObj.normalCount === undefined
    ) {
      if (newObj.jainCount === 0) {
        old.splice(index, 1);
        return [...old];
      } else {
        old.splice(index, 1);
        old.push(newObj);
        return [...old];
      }
    }
  } else {
    if (newObj.normalCount > 0 || newObj.jainCount > 0) {
      old.push(newObj);
      return [...old];
    } else {
      return [...old];
    }
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      let newState = findAndUpdate(state, action.payload);
      return [...newState];
    }
    case "UPDATE_CART_BULK": {
      return [...action.payload];
    }
    default:
      return state;
  }
};
