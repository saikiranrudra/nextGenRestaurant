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
                    id: action.payload.ingredientId,
                });
                if (ingredientIndex !== -1) {
                    let checkIndex = _.findIndex(state[index].ingredients, {
                        id: action.payload.newIngredient.id,
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
                    (ing) => ing.id === action.payload.id
                );
            });

            return [...state];
        }

        default:
            return state;
    }
};
