import _ from "lodash";

export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_INGREDIENTS":
            return action.payload;

        case "DELETE_INGREDIENT":
            _.remove(state, action.payload);
            return [...state];

        case "ADD_INGREDIENT":
            state.unshift(action.payload);
            return [...state];

        case "EDIT_INGREDIENT":
            let index = _.findIndex(
                state,
                (ingredient) => ingredient._id === action.payload._id
            );
            if (index !== -1) {
                state[index] = action.payload;
            }
            return [...state];

        default:
            return state;
    }
};
