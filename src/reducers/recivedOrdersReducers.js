const findIndex = (data, item) => {
    let index = -1;
    data.forEach((obj, i) => {
        if (obj._id === item._id) {
            index = i;
        }
    });

    return index;
};

const updateConfirmOrder = (old, newData) => {
    let data = old;
    newData.forEach((item) => {
        let index = findIndex(data, item);
        if (index === -1) {
            data.push(item);
        } else {
            if (data[index].jainCount !== undefined) {
                data[index].jainCount += newData.jainCount;
            }

            if (data[index].normalCount !== undefined) {
                data[index].normalCount += newData.normalCount;
            }
        }
    });
    return data;
};

export default (state = [], action) => {
    if (action.type === "ADD_CONFIRM_ORDERS") {
        let newItems = updateConfirmOrder(state, action.payload);
        return [...newItems];
    } else {
        return state;
    }
};
