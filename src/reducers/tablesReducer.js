export default (state = [], action) => {
    if (action.type === "FETCH_TABLES") {
        return action.payload;
    } else {
        return state;
    }
};
