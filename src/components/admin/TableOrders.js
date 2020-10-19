import React, { useCallback, useEffect, useState } from "react";

// Components
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography,
} from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//Actions
import {fetchTables} from "./../../actions/general/table";

//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//Utils
import _ from "lodash";

// icons
import edit from "./../..//assets/dashboardAssets/edit.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    red: {
        color: theme.palette.primary.main,
    },
    totalPrice: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        margin: "1rem",
    },
    head: {
        "& > th": {
            fontFamily: "Product-Sans",
            color: "#989898",
            fontSize: ".8rem",
            backgroundColor: "#F5F5F5",
            paddingBottom: "0",
        },
    },
    tableBody: {
        border: "8px solid #f5f5f5",
        // borderBottom: "5px solid #f5f5f5",
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            backgroundColor: "#fff",
        },
    },
}));

const totalPrice = (tableData) => {
    let total = 0;
    tableData.placedItems.forEach((item) => {
        if (item.normalCount !== undefined) {
            total += item.normalCount * item.price;
        }

        if (item.jainCount !== undefined) {
            total += item.jainCount * item.price;
        }
    });

    tableData.cookedItems.forEach((item) => {
        if (item.normalCount !== undefined) {
            total += item.normalCount * item.price;
        }

        if (item.jainCount !== undefined) {
            total += item.jainCount * item.price;
        }
    });

    return total;
};

const TableOrders = (props) => {
    const classes = useStyle();
    const [tableData, setTableData] = useState({
        placedItems: [],
        cookedItems: [],
    });
    const {tableData: tableOrders} = props;
    // const [tableOrders, setTableOrders] = useState({});
    const [total, setTotal] = useState(totalPrice(tableData));
    const [btnText, setBtnText] = useState("Recived");

    const handleRecivedOrder = async () => {
        setBtnText("Please Wait...");
        let data = _.clone(tableOrders);

        data.forEach((order) => {
            order.state = "payed";
            order.outTime = Date.now();
        });

        
        try {
            
            const transection = await axios.post(`${baseURL}/api/v1/transection/getTransection`, {
                token: props.staff.token,
                tableNo: props.selectedTable._id,
            })
            
            await axios.post(`${baseURL}/api/v1/orders/markPayed`, {
                token: props.staff.token,
                tableNo: props.selectedTable._id,
                transectionId: transection.data.data._id
            })
                
    
            // make table as vacant
            await axios.post(`${baseURL}/api/v1/table/updateTable`, {
                _id: data[0].tableNo,
                isVacant: true
            })
            
            props.fetchTables()
            fetchTableData();
            setBtnText("Recived");
        }
        
        catch(err) {
            alert("Unable to vacant seat");
            console.log(err);
            setBtnText("Recived");
        }


    };

    const fetchTableData = useCallback(() => {
        const placedItems = _.compact(
            _.flatten(
                tableOrders.map((order) => {
                    if (order.state === "placed") {
                        return order.items;
                    } else {
                        return null;
                    }
                })
            )
        );

        const cookedItems = _.compact(
            _.flatten(
                tableOrders.map((order) => {
                    if (order.state === "cooked") {
                        return order.items;
                    } else {
                        return null;
                    }
                })
            )
        );            
        setTableData({ placedItems, cookedItems });
    }, [tableOrders]);

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);

    useEffect(() => {
        setTotal(totalPrice(tableData));
    }, [tableData]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                }}
            >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Orders
                </Typography>
                <Button
                    variant="contained"
                    endIcon={
                        <img src={edit} alt="edit" style={{ width: "1rem" }} />
                    }
                    style={{ backgroundColor: "#fff" }}
                    onClick={() => {
                        props.setEditable(true);
                    }}
                >
                    Edit
                </Button>
            </div>

            <div
                style={{
                    backgroundColor: "#D9D9D9",
                    padding: ".3rem .4rem",
                    borderRadius: "4px",
                }}
            >
                <span style={{ fontWeight: "bold" }}>Table</span>{" "}
                <span className={classes.red} style={{ fontWeight: "bold" }}>
                    {props.selectedTable.tableNo}
                </span>
            </div>

            <div
                style={{
                    padding: "1.1rem .3rem",
                    backgroundColor: "#f5f5f5",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    height: "35rem",
                }}
            >
                <Table style={{ backgroundColor: "#F5F5F5" }}>
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell>
                                <b>Preparing</b>
                            </TableCell>
                            <TableCell>
                                <b>Jain</b>
                            </TableCell>
                            <TableCell>
                                <b>Normal</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.placedItems.map((item, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className={classes.tableBody}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.jainCount ? item.jainCount : 0}
                                    </TableCell>
                                    <TableCell>
                                        {item.normalCount
                                            ? item.normalCount
                                            : 0}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Table>
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell>
                                <b>Served</b>
                            </TableCell>
                            <TableCell>
                                <b>Jain</b>
                            </TableCell>
                            <TableCell>
                                <b>Normal</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.cookedItems.map((item, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className={classes.tableBody}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.jainCount ? item.jainCount : 0}
                                    </TableCell>
                                    <TableCell>
                                        {item.normalCount
                                            ? item.normalCount
                                            : 0}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Typography
                    variant="h4"
                    align="right"
                    className={classes.totalPrice}
                >
                    {total}₹
                </Typography>
                <div style={{ textAlign: "end", marginBottom: "1rem" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            fontFamily: "Product-Sans",
                            fontWeight: "bold",
                        }}
                        disabled={
                            total === 0 ||
                            btnText.toLowerCase().includes("please wait")
                                ? true
                                : false
                        }
                        onClick={handleRecivedOrder}
                    >
                        Recived
                    </Button>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps, {fetchTables})(TableOrders);
