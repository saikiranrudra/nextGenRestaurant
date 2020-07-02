import { combineReducers } from "redux";

// reducers
import emailReducer from "./emailReducer";
import { selectCategories, categories } from "./categoryReducer";
import authReducer from "./authReducer";
import menuReducers from "./menuReducers";
import cartReducer from "./cartReducer";

export default combineReducers({
  email: emailReducer,
  category: selectCategories,
  categories: categories,
  user: authReducer,
  menu: menuReducers,
  cart: cartReducer,
});
