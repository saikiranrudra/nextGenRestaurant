const defaultTheme = {
    primary: "#FC6565",
};
export default (state = defaultTheme, action) => {
    switch (action.type) {
        case "FETCH_THEME":
            return action.payload;

        case "SET_PRIMARY_COLOR":
            return { ...state, primary: action.payload };
        default:
            return state;
    }
};
