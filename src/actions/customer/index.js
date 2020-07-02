import c1 from "./../../assets/catogery/c1 (1).png";
import c2 from "./../../assets/catogery/c1 (2).png";
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

export const setCategory = (categorie) => ({
  type: "SET_CATEGORY",
  payload: categorie,
});

export const customerAuthenticate = (user) => {
  //perfrom authentication later

  //If authenticated passed
  return {
    type: "AUTHENTICATION_AND_AUTHORIZATION",
    payload: {
      email: user.email ? user.email : "saikiranrudra2@gmail.com",
      role: "customer",
      id: "abcd123456789",
    },
  };
  //If authentication failed
  //   return {
  //     type: "AUTHENTICATION_AND_AUTHORIZATION",
  //     payload: null,
  //   };
};

let items = [
  {
    id: "123abc",
    img: c1,
    name: "Risotto",
    categorie: "punjabi",
    rating: 4,
    mealFor: 2,
    price: 125,
    jainCount: 0,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "456def",
    img: c2,
    name: "PanCake",
    categorie: "pancake",
    rating: 3,
    mealFor: 2,
    price: 25,
    jainCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "789ghi",
    img: c3,
    name: "Manchurian",
    categorie: "chinese",
    rating: 1,
    mealFor: 1,
    price: 100,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112jkl",
    img: c4,
    name: "Rice",
    categorie: "south indian",
    rating: 4,
    mealFor: 3,
    price: 120,
    jainCount: 0,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
];

export const fetchMenuItems = () => (dispatch) => {
  //api call Menu Items

  // imetating api call with setTimeOut
  setTimeout(() => {
    dispatch({
      type: "FETCH_MENU_ITEMS",
      payload: items,
    });
  }, 4000);
};

//temp catefories
let categories = [
  {
    name: "Punjabi",
    img: c1,
  },
  {
    name: "Punabi Bread",
    img: c2,
  },
  {
    name: "Chines Food",
    img: c3,
  },
  {
    name: "Pizza",
    img: c4,
  },
  {
    name: "Gujarati",
    img: c2,
  },
  {
    name: "South Indian",
    img: c4,
  },
  {
    name: "Contenental",
    img: c3,
  },
];

export const fetchCategories = () => (dispatch) => {
  //api call Menu categories

  // imetating api call with setTimeOut
  setTimeout(() => {
    dispatch({
      type: "FETCH_MENU_CATEGORIES",
      payload: categories,
    });
  }, 4000);
};

export const updateMenu = (data) => {
  return {
    type: "UPDATE_MENU",
    payload: data,
  };
};

export const updateCart = (item) => {
  return {
    type: "UPDATE_CART",
    payload: item,
  };
};
