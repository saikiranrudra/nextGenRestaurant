import axios from "axios";
import { baseURL } from "./../../variables";
export const fetchAppData = () => (dispatch) => {
    axios.get(`${baseURL}/api/v1/restaurant/getRestaurant`).then((res) => {
        dispatch({ type: "APP_DATA", payload: res.data.data });
    });
};

export const updateAppData = (data) => {
    return {
        type: "APP_DATA",
        payload: data,
    };
};
