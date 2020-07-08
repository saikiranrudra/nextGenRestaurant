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
    category: "Punjabi",
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
    category: "Punjabi Bread",
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
    category: "Chines Food",
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
    category: "South Indian",
    rating: 4,
    mealFor: 3,
    price: 120,
    jainCount: 0,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross1",
    img: c4,
    name: "Coke",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross2",
    img: c4,
    name: "Butter Milk",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
    normalCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross3",
    img: c4,
    name: "papaad",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
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
    name: "Punjabi Bread",
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
    name: "Cross Sale",
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

export const updateMenuBulk = (items) => {
  return {
    type: "UPDATE_MENU_BULK",
    payload: items,
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

let previousOrderData = [
  {
    id: "123abc",
    img: c1,
    name: "Risotto",
    category: "Punjabi",
    rating: 4,
    mealFor: 2,
    price: 125,
    jainCount: 7,
    normalCount: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "456def",
    img: c2,
    name: "PanCake",
    category: "Punjabi Bread",
    rating: 3,
    mealFor: 2,
    price: 25,
    jainCount: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "789ghi",
    img: c3,
    name: "Manchurian",
    category: "Chines Food",
    rating: 1,
    mealFor: 1,
    price: 100,
    normalCount: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
];

export const previousOrder = () => (dispatch) => {
  //api call for previous order

  // imetating api call with setTimeOut
  setTimeout(() => {
    dispatch({
      type: "FETCH_PREVIOUS_ORDER",
      payload: previousOrderData,
    });
  }, 4000);
};

export const showPreviousOrder = (visibility) => {
  return {
    type: "PREVIOUS_ORDER_SET_VISIBLITY",
    payload: visibility,
  };
};

export const addPlaceOrder = (items) => {
  return {
    type: "ADD_PLACED_ORDER",
    payload: items,
  };
};

export const addConfirmOrder = (items) => {
  return {
    type: "ADD_CONFIRM_ORDER",
    payload: items,
  };
};
