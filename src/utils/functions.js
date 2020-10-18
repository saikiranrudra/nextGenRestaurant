import _ from "lodash";

export const getTableNo = (tables, tableId) => {
    for(let i = 0; i < tables.length; i++) {
        if(tables[i]._id === tableId) {
            return tables[i].tableNo;
        }
    }
    return "None"
}

export const getFormatedDate = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export const timeFormat = (dateStr) => {
    let date = new Date(dateStr);
    return `${date.getHours()}:${date.getMinutes()}`
}

export const totalCostOforders = (orders) => {
    let total = 0;
    orders.forEach(order => {
        total += order.totalPrice;
    })
    return total;
}

export const getItemsFromOrders = (orders) => {
    let items = [];

    items = orders.map(order => order.items);
    items = _.flatten(items);

    return items;
}

export const countOrdersBaseOnState = (orders=[], states=[]) => {
    let count = 0;
    orders.forEach(order => {
        if(states.includes(order.state)) {
            count++;
        }
    })
    return count;
}

export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}