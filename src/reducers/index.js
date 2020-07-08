import { combineReducers } from "redux";

// reducers
import emailReducer from "./emailReducer";
import { selectCategories, categories } from "./categoryReducer";
import authReducer from "./authReducer";
import menuReducers from "./menuReducers";
// import cartReducer from "./cartReducer";
import orders from "./orders";
import previousOrderVisibility from "./previousOrderVIsibility";
import confirmOrderReducers from "./confirmOrderReducers";

export default combineReducers({
  email: emailReducer,
  category: selectCategories,
  categories: categories,
  user: authReducer,
  menu: menuReducers,
  // cart: cartReducer,
  previousOrders: orders,
  previousOrderVisibility: previousOrderVisibility,
  confirmOrderReducers: confirmOrderReducers,
});
