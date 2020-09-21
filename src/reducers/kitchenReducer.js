const modifyOrder = (item, tableNo, state) => {
    let index = -1,
        itemIndex = -1;
    state.forEach((table, i) => {
        if (table.tableNo === tableNo) {
            index = i;
        }
    });

    state[index].items.forEach((el, i) => {
        if (item._id === el._id) {
            itemIndex = i;
        }
    });

    state[index].items[itemIndex].isCooked = true;
    return state;
};

const deleteByTableNo = (tableNo, state) => {
    let index = -1;
    state.forEach((table, i) => {
        if (table.tableNo === tableNo) {
            index = i;
        }
    });

    if (index !== -1) {
        state.splice(index, 1);
    }

    return state;
};

export default (state = [], action) => {
    if (action.type === "FETCH_KITCHEN_ORDERS") {
        return action.payload;
    } else if (action.type === "MARK_KITCHEN_ORDER_DONE") {
        const { tableNo, item } = action.payload;
        state = modifyOrder(item, tableNo, state);
        return [...state];
    }
    if (action.type === "DELETE_TABLE_ALL_ORDERS") {
        state = deleteByTableNo(action.payload, state);
        return [...state];
    } else {
        return state;
    }
};

export const incrementOrderServed = (state = 0, action) => {
    if (action.type === "INCREMENT_ORDER_SERVED") {
        return state + action.payload;
    } else {
        return state;
    }
};
