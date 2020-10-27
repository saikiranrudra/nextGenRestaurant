import axios from "axios";

import { baseURL } from "./../../variables";

/**** Authentication ****/
export const customerAuthenticate = (user) => {
    //perfrom authentication later
    return {
        type: "AUTHENTICATION_AND_AUTHORIZATION",
        payload: user,
    };
   
};

/***** CATEGORY *******/

//use in search based on cateogry
export const setCategory = (categorie) => ({
    type: "SET_CATEGORY",
    payload: categorie,
});

//temp catefories

export const fetchCategories = () => (dispatch) => {
    //api call Menu categories
    axios
        .get(`${baseURL}/api/v1/category/getAllCategory`)
        .then((res) => {
            dispatch({
                type: "FETCH_MENU_CATEGORIES",
                payload: res.data.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "FETCH_MENU_CATEGORIES",
                payload: [],
            });
        });
};

export const addCategory = (category) => {
    return {
        type: "ADD_CATEGORY",
        payload: category,
    };
};

export const removeCategory = (category) => {
    return {
        type: "REMOVE_CATEGORY",
        payload: category,
    };
};

export const modifyCategory = (newCategory) => {
    return {
        type: "MODIFY_CATEGORY",
        payload: newCategory,
    };
};

/***** MENU *****/
export const fetchMenuItems = () => (dispatch) => {
    //api call Menu Items
    // DONT FETCH ITEM whose deleted property is true
    axios
        .get(`${baseURL}/api/v1/items`)
        .then((res) => {
            dispatch({
                type: "FETCH_MENU_ITEMS",
                payload: res.data.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: "FETCH_MENU_ITEMS",
                payload: [],
            });
        });

    // imetating api call with setTimeOut
    setTimeout(() => {}, 4000);
};

export const updateMenu = (data) => {
    return {
        type: "UPDATE_MENU_ITEM",
        payload: data,
    };
};

export const updateMenuBulk = (items) => {
    return {
        type: "UPDATE_MENU_BULK",
        payload: items,
    };
};

export const addItemToMenu = (item) => {
    return {
        type: "ADD_ITEM_TO_MENU",
        payload: item,
    };
};

export const removeItemFromMenu = (item) => {
    return {
        type: "REMOVER_ITEM_FROM_MENU",
        payload: item,
    };
};

export const addIngredient = (item, ingredient) => {
    return {
        type: "ADD_INGREDIENT_TO_ITEM",
        payload: {
            item,
            ingredient,
        },
    };
};

export const removeIngredient = (item, ingredient) => {
    return {
        type: "REMOVE_INGREDIENT_FROM_ITEM",
        payload: {
            item,
            ingredient,
        },
    };
};

// Not Implemented yet
export const editIngridentInMenu = (item, ingredientId, newIngredient) => {
    return {
        type: "EDIT_INGREDIENT_IN_ITEM",
        payload: {
            item,
            ingredientId,
            newIngredient,
        },
    };
};

export const deleteIngredientFromAllItems = (ingredient) => {
    return {
        type: "DELETE_INGREDIENT_FROM_ALL_ITEMS",
        payload: ingredient,
    };
};


/**** Orders ****/

export const previousOrder = (data) => (dispatch) => {
    //api call for previous order
    
    axios.post(`${baseURL}/api/v1/orders/getPreviousOrders`, data)
        .then(res => {
            dispatch({
                type: "FETCH_PREVIOUS_ORDER",
                payload: res.data.data.items,
            });
        }).catch(err => {
            console.log(err);
        })
    
    // imetating api call with setTimeOut
};

export const showPreviousOrder = (visibility) => {
    return {
        type: "PREVIOUS_ORDER_SET_VISIBLITY",
        payload: visibility,
    };
};

export const addConfirmedOrder = (token) => (dispatch) => {
    // create an api request to db to recive confirm orders

    axios
        .post(`${baseURL}/api/v1/orders/myorders`, { token })
        .then((res) => {
            dispatch({
                type: "ADD_PLACED_ORDERS",
                payload: res.data.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "ADD_CONFIRM_ORDERS",
                payload: [],
            });
        });
};

/***** SEARCH *****/
export const setSearch = (key) => {
    return {
        type: "SET_SEARCH",
        payload: key,
    };
};

/***** Discount Value *****/
export const fetchDiscount = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: "FETCH_POINT_VALUE",
            payload: {
                percent: 5,
                points: 100,
                perVisit: 10,
                redeemLimit: 200,
            },
        });
    }, 5000);
};

export const fetchIngredients = () => (dispatch) => {
    axios.get(`${baseURL}/api/v1/ingredient/getAllIngredients`).then((res) => {
        dispatch({
            type: "FETCH_INGREDIENTS",
            payload: res.data.data,
        });
    });
};

export const deleteIngredients = (ingredient) => {
    return {
        type: "DELETE_INGREDIENT",
        payload: ingredient,
    };
};

export const addNewIngredient = (ingredient) => {
    return {
        type: "ADD_INGREDIENT",
        payload: ingredient,
    };
};

export const editIngredient = (ingredient) => {
    return {
        type: "EDIT_INGREDIENT",
        payload: ingredient,
    };
};

//************ tableNo ***********/

export const setTableNo = (tableNo) => {
    return {
        type: "SET_TABLE_NUMBER",
        payload: tableNo,
    };
};

export const staffLogin = (staff) => {
    return {
        type: "STAFF_LOGIN",
        payload: staff,
    };
};
