import c1 from "./../../assets/catogery/c1 (1).png";
import c2 from "./../../assets/catogery/c1 (2).png";
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

// put isCooked to false for all items by default
const orders = [
  {
    items: [
      {
        id: "123abc",
        img: c1,
        name: "Risotto",
        category: "Punjabi",
        rating: 4,
        mealFor: 2,
        price: 125,
        jainCount: 3,
        normalCount: 4,
        isCooked: false,
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
        isCooked: false,
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
        normalCount: 2,
        isCooked: false,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
      },
    ],
    tableNo: 1,
    comment: "Extra Spicy",
  },
  {
    items: [
      {
        id: "101112jkl",
        img: c4,
        name: "Rice",
        category: "South Indian",
        rating: 4,
        mealFor: 3,
        price: 120,
        isCooked: true,
        jainCount: 3,
        normalCount: 1,
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
        isCooked: false,
        normalCount: 5,
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
        isCooked: false,
        normalCount: 2,
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
        isCooked: false,
        normalCount: 8,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
      },
    ],
    tableNo: 3,
    comment: "Not very spicy medium",
  },
  {
    items: [
      {
        id: "456def",
        img: c2,
        name: "PanCake",
        category: "Punjabi Bread",
        rating: 3,
        mealFor: 2,
        price: 25,
        jainCount: 4,
        isCooked: true,
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
        normalCount: 2,
        isCooked: false,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
      },
    ],
    tableNo: 5,
    comment: "Extra Spicy",
  },
  {
    items: [
      {
        id: "101112jkl",
        img: c4,
        name: "Rice",
        category: "South Indian",
        rating: 4,
        mealFor: 3,
        price: 120,
        isCooked: false,
        jainCount: 3,
        normalCount: 1,
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
        isCooked: false,
        normalCount: 5,
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
        isCooked: false,
        normalCount: 2,
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
        isCooked: false,
        normalCount: 8,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
      },
    ],
    tableNo: 4,
    comment: "Not very spicy medium",
  },
];

export const fetchKitchenOrders = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: "FETCH_KITCHEN_ORDERS", payload: orders });
  }, 4000);
};

export const markKitchenOrderDone = (item) => {
  return {
    type: "MARK_KITCHEN_ORDER_DONE",
    payload: item,
  };
};

export const incrementOrderServed = (noOfItems) => {
  return {
    type: "INCREMENT_ORDER_SERVED",
    payload: noOfItems,
  };
};
