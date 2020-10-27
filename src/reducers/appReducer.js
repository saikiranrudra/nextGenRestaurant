export default (state = {}, action) => {
    if (action.type === "APP_DATA") {
        return {...action.payload};
    } else {
        return state;
    }
};
