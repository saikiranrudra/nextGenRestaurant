//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

export const fetchTables = () => (dispatch) => {
    axios
        .get(`${baseURL}/api/v1/table/readAllTables`)
        .then((res) => {
            dispatch({ type: "FETCH_TABLES", payload: res.data.data });
        })
        .catch((err) => {
            console.log("FETCH_TABLES_ERROR: ", err);
            dispatch({ type: "FETCH_TABLES", payload: [] });
        });
};
