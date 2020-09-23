// import c1 from "./../../assets/catogery/c1 (1).png";
// import c2 from "./../../assets/catogery/c1 (2).png";
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

import axios from "axios";

import { baseURL } from "./../../variables";

/**** Authentication ****/
export const customerAuthenticate = (user) => {
    //perfrom authentication later

    //If authenticated passed
    return {
        type: "AUTHENTICATION_AND_AUTHORIZATION",
        payload: user,
    };
    //If authentication failed
    //   return {
    //     type: "AUTHENTICATION_AND_AUTHORIZATION",
    //     payload: null,
    //   };
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

// let items = [
//     {
//         id: "123abc",
//         img: c1,
//         name: "Risotto",
//         category: [
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//             {
//                 id: "13abc",
//                 name: "Punjabi",
//                 img: c1,
//             },
//         ],
//         rating: 4,
//         mealFor: 2,
//         price: 125,
//         jainCount: 0,
//         normalCount: 0,
//         featured: false,
//         visible: true,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing1",
//                 name: "maida",
//                 amount: 1,
//                 unit: "kg",
//             },
//             {
//                 id: "ing2",
//                 name: "mirch",
//                 amount: 4,
//                 unit: "nos",
//             },
//             {
//                 id: "ing3",
//                 name: "oil",
//                 amount: 0.4,
//                 unit: "l",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "456def",
//         img: c2,
//         name: "PanCake",
//         category: [
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//             {
//                 id: "13abc",
//                 name: "Punjabi",
//                 img: c1,
//             },
//             {
//                 id: "14abc",
//                 name: "Punjabi Bread",
//                 img: c2,
//             },
//         ],
//         rating: 3,
//         mealFor: 2,
//         price: 25,
//         jainCount: 0,
//         featured: false,
//         visible: true,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing1",
//                 name: "maida",
//                 amount: 5,
//                 unit: "kg",
//             },
//             {
//                 id: "ing3",
//                 name: "oil",
//                 amount: 1,
//                 unit: "l",
//             },
//             {
//                 id: "ing4",
//                 name: "masala",
//                 amount: 50,
//                 unit: "g",
//             },
//             {
//                 id: "ing5",
//                 name: "tomatos",
//                 amount: 0.75,
//                 unit: "kg",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "789ghi",
//         img: c3,
//         name: "Manchurian",
//         category: [
//             {
//                 id: "15abc",
//                 name: "Chines Food",
//                 img: c3,
//             },
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//         ],
//         rating: 1,
//         mealFor: 1,
//         price: 100,
//         normalCount: 0,
//         featured: true,
//         visible: true,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing1",
//                 name: "maida",
//                 amount: 5,
//                 unit: "kg",
//             },
//             {
//                 id: "ing2",
//                 name: "mirch",
//                 amount: 12,
//                 unit: "nos",
//             },
//             {
//                 id: "ing3",
//                 name: "oil",
//                 amount: 1.2,
//                 unit: "l",
//             },
//             {
//                 id: "ing4",
//                 name: "masala",
//                 amount: 10,
//                 unit: "g",
//             },
//             {
//                 id: "ing5",
//                 name: "tomatos",
//                 amount: 12,
//                 unit: "kg",
//             },
//             {
//                 id: "ing6",
//                 name: "rice",
//                 amount: 40,
//                 unit: "kg",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "101112jkl",
//         img: c4,
//         name: "Rice",
//         category: [
//             {
//                 id: "128abc",
//                 name: "South Indian",
//                 img: c4,
//             },
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//         ],
//         rating: 4,
//         mealFor: 3,
//         price: 120,
//         jainCount: 0,
//         normalCount: 0,
//         featured: false,
//         visible: false,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing2",
//                 name: "mirch",
//                 amount: 12,
//                 unit: "nos",
//             },
//             {
//                 id: "ing3",
//                 name: "oil",
//                 amount: 1.2,
//                 unit: "l",
//             },
//             {
//                 id: "ing4",
//                 name: "masala",
//                 amount: 20,
//                 unit: "g",
//             },
//             {
//                 id: "ing5",
//                 name: "tomatos",
//                 amount: 12,
//                 unit: "kg",
//             },
//             {
//                 id: "ing6",
//                 name: "rice",
//                 amount: 40,
//                 unit: "kg",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "101112cross1",
//         img: c4,
//         name: "Coke",
//         category: [
//             {
//                 id: "129abc",
//                 name: "Cross Sale",
//                 img: c3,
//             },
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//         ],
//         rating: 4,
//         mealFor: 3,
//         price: 120,
//         normalCount: 0,
//         featured: false,
//         visible: false,
//         deleted: false,
//         ingredients: [],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "101112cross2",
//         img: c4,
//         name: "Butter Milk",
//         category: [
//             {
//                 id: "129abc",
//                 name: "Cross Sale",
//                 img: c3,
//             },
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//             {
//                 id: "13abc",
//                 name: "Punjabi",
//                 img: c1,
//             },
//         ],
//         rating: 4,
//         mealFor: 3,
//         price: 120,
//         normalCount: 0,
//         featured: false,
//         visible: true,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing4",
//                 name: "masala",
//                 amount: 10,
//                 unit: "g",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
//     {
//         id: "101112cross3",
//         img: c4,
//         name: "papaad",
//         category: [
//             {
//                 id: "129abc",
//                 name: "Cross Sale",
//                 img: c3,
//             },
//             {
//                 id: "12abc",
//                 name: "all",
//                 img: c4,
//             },
//         ],
//         rating: 4,
//         mealFor: 3,
//         price: 120,
//         normalCount: 0,
//         featured: false,
//         visible: true,
//         deleted: false,
//         ingredients: [
//             {
//                 id: "ing3",
//                 name: "oil",
//                 amount: 1.2,
//                 unit: "l",
//             },
//             {
//                 id: "ing4",
//                 name: "masala",
//                 amount: 10,
//                 unit: "g",
//             },
//         ],
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
//     },
// ];

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

// export const updateCart = (item) => {
//   return {
//     type: "UPDATE_CART",
//     payload: item,
//   };
// };

// export const updateCartBulk = (items) => {
//   return {
//     type: "UPDATE_CART_BULK",
//     payload: items,
//   };
// };

/**** Orders ****/

let previousOrderData = [
    {
        id: "789ghi",
        img: c3,
        name: "Manchurian",
        category: ["Chines Food", "all"],
        rating: 1,
        mealFor: 1,
        price: 100,
        normalCount: 5,
        featured: true,
        visible: true,
        deleted: false,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
    },
    {
        id: "101112jkl",
        img: c4,
        name: "Rice",
        category: ["South Indian", "all"],
        rating: 4,
        mealFor: 3,
        price: 120,
        jainCount: 3,
        normalCount: 4,
        featured: false,
        visible: false,
        deleted: false,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
    },
    {
        id: "101112cross1",
        img: c4,
        name: "Coke",
        category: ["Cross Sale", "all"],
        rating: 4,
        mealFor: 3,
        price: 120,
        normalCount: 2,
        featured: false,
        visible: false,
        deleted: false,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
    },
];

export const previousOrder = () => (dispatch) => {
    //api call for previous order
    // axios.get()
    // imetating api call with setTimeOut
    dispatch({
        type: "FETCH_PREVIOUS_ORDER",
        payload: previousOrderData,
    });
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

const ingredients = [
    {
        id: "ing1",
        name: "maida",
        unit: "kg",
    },
    {
        id: "ing2",
        name: "mirch",
        unit: "nos",
    },
    {
        id: "ing3",
        name: "oil",
        unit: "l",
    },
    {
        id: "ing4",
        name: "masala",
        unit: "g",
    },
    {
        id: "ing5",
        name: "tomatos",
        unit: "kg",
    },
    {
        id: "ing6",
        name: "rice",
        unit: "kg",
    },
];

export const fetchIngredients = () => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: "FETCH_INGREDIENTS",
            payload: ingredients,
        });
    }, 5000);
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
