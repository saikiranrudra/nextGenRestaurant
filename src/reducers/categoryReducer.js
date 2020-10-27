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
        case "REMOVE_CATEGORY": {
            let newState = state;
            _.remove(newState, (item) => item._id === action.payload._id);
            return [...newState];
        }
        case "MODIFY_CATEGORY": {
            const index = _.findIndex(
                state,
                (item) => item._id === action.payload._id
            );
            state[index] = action.payload;
            return [...state];
        }
        default:
            return state;
    }
};
