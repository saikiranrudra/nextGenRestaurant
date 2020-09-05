export const fetchAppState = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: "FETCH_APP_STATE", payload: "online" });
    }, 2000);
};

export const setAppState = (appState) => {
    return {
        type: "SET_APP_STATE",
        payload: appState,
    };
};
