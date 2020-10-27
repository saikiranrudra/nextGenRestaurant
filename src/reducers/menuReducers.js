import _ from "lodash";

const findAndUpdate = (old, newObj) => {
    let index = -1;
    old.forEach((e, i) => {
        if (e._id === newObj._id) {
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

const updateBulk = (items, state) => {
    const newState = _.clone(state);
    newState.forEach(item => {
        items.forEach(newItem => {
            if(item._id === newItem._id) {
                if(item.normalCount !== undefined) {
                    item.normalCount = newItem.normalCount;
                }

                if(item.jainCount !== undefined) {
                    item.jainCount = newItem.jainCount
                }
            }
        })
    })

    return newState;
}

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
            let newState = updateBulk(items, state);
            return [...newState];
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
            _.remove(state, (item) => item._id === action.payload._id);
            return [...state];
        }

        case "ADD_INGREDIENT_TO_ITEM": {
            let index = _.findIndex(state, action.payload.item);
            if (index !== -1) {
                let ingredientIndex = _.findIndex(state[index].ingredients, {
                    id: action.payload.ingredient.id,
                });
                if (ingredientIndex === -1) {
                    state[index].ingredients.push(action.payload.ingredient);
                }
            }
            return [...state];
        }

        case "REMOVE_INGREDIENT_FROM_ITEM": {
            let index = _.findIndex(state, action.payload.item);
            if (index !== -1) {
                _.remove(state[index].ingredients, action.payload.ingredient);
            }
            return [...state];
        }

        case "EDIT_INGREDIENT_IN_ITEM": {
            let index = _.findIndex(state, action.payload.item);
            if (index !== -1) {
                let ingredientIndex = _.findIndex(state[index].ingredients, {
                    _id: action.payload.ingredientId,
                });
                if (ingredientIndex !== -1) {
                    let checkIndex = _.findIndex(state[index].ingredients, {
                        _id: action.payload.newIngredient.id,
                        amount: action.payload.newIngredient.amount,
                    });
                    if (checkIndex === -1) {
                        state[index].ingredients[ingredientIndex] =
                            action.payload.newIngredient;
                    }
                }
            }

            return [...state];
        }

        case "DELETE_INGREDIENT_FROM_ALL_ITEMS": {
            _.forEach(state, (item) => {
                _.remove(
                    item.ingredients,
                    (ing) => ing._id === action.payload._id
                );
            });

            return [...state];
        }

        default:
            return state;
    }
};
