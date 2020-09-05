export default (state = "offline", action) => {
    switch (action.type) {
        case "FETCH_APP_STATE":
            return action.payload;
        case "SET_APP_STATE":
            return action.payload;
        default:
            return state;
    }
};
