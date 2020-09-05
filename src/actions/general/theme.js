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
