export default (state = null, action) => {
    if (action.type === "STAFF_LOGIN") {
        return action.payload;
    } else {
        return state;
    }
};
