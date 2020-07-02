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
        return [...old, newObj];
      } else {
        old.splice(index, 1);
        return old;
      }
    } else if (
      newObj.jainCount === undefined &&
      newObj.normalCount !== undefined
    ) {
      if (newObj.normalCount === 0) {
        old.splice(index, 1);
        return old;
      } else {
        old.splice(index, 1);
        return [...old, newObj];
      }
    } else if (
      newObj.jainCount !== undefined &&
      newObj.normalCount === undefined
    ) {
      if (newObj.jainCount === 0) {
        old.splice(index, 1);
        return old;
      } else {
        old.splice(index, 1);
        return [old, newObj];
      }
    }
    old[index] = newObj;
    return old;
  } else {
    if (newObj.normalCount > 0 || newObj.jainCount > 0) {
      return [...old, newObj];
    } else {
      return old;
    }
  }
};

export default (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      state = findAndUpdate(state, action.payload);
      return [...state];
    }
    default:
      return state;
  }
};
