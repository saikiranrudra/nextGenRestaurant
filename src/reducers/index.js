import { combineReducers } from "redux";

// reducers
import emailReducer from "./emailReducer";
import { selectCategories, categories } from "./categoryReducer";
import authReducer from "./authReducer";
import menuReducers from "./menuReducers";
// import cartReducer from "./cartReducer";
import orders from "./orders";
import previousOrderVisibility from "./previousOrderVIsibility";
import recivedOrdersReducers from "./recivedOrdersReducers";
import searchReducer from "./searchReducer";
import pointsReducer from "./pointsReducer";
import kitchenReducer from "./kitchenReducer";
import { incrementOrderServed } from "./kitchenReducer";
import ingredientReducer from "./ingredientReducer";
import themeReducer from "./themeReducer";
import appStateReducer from "./appStateReducer";
import tableReducer from "./tableReducer";

export default combineReducers({
    appState: appStateReducer,
    email: emailReducer,
    theme: themeReducer,
    category: selectCategories,
    categories: categories,
    user: authReducer,
    menu: menuReducers,
    // cart: cartReducer,
    previousOrders: orders,
    previousOrderVisibility: previousOrderVisibility,
    recivedOrders: recivedOrdersReducers,
    search: searchReducer,
    pointValue: pointsReducer,
    kitchenOrders: kitchenReducer,
    orderServed: incrementOrderServed,
    ingredients: ingredientReducer,
    tableNo: tableReducer,
});
