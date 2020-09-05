export const fetchTheme = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: "FETCH_THEME",
            payload: {
                primary: "#79E08F",
            },
        });
    }, 3000);
};

export const setPrimaryColor = (color) => {
    return {
        type: "SET_PRIMARY_COLOR",
        payload: color,
    };
};
