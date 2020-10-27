export default (state = null, action) => {
    if (action.type === "SET_TABLE_NUMBER") {
        return action.payload;
    } else {
        return state;
    }
};
