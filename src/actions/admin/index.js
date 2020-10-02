import axios from "axios";
import { baseURL } from "./../../variables";

export const updateMenuItemFeatured = (item) => {
    return {
        type: "UPDATE_MENU_ITEM_FEATURED",
        payload: item,
    };
};

export const fetchEmployee = () => (dispatch) => {
    axios
        .get(`${baseURL}/api/v1/employee/getEmployees`)
        .then((res) => {
            dispatch({
                type: "FETCH_EMPLOYEES",
                payload: res.data.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: "FETCH_EMPLOYEES",
                payload: [],
            });
        });
};
