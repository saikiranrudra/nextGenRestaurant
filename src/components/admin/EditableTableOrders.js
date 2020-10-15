import React, { useState } from "react";

//components
import {
    Button,
    Typography,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
} from "@material-ui/core";
import Counter from "./Counter";

//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//State Management
import { connect } from "react-redux";

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
            padding: ".7rem",
        },
    },
}));

const renderTables = (type, tableData, setTableData, classes) => {
    let components = [];

    tableData.forEach((order, orderIndex) => {
        if (order.state === type) {
            order.items.forEach((item, itemIndex) => {
                components.push(
                    <TableRow
                        key={`${orderIndex}${itemIndex}`}
                        className={classes.tableBody}
                    >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            {item.jainCount !== undefined ? (
                                <Counter
                                    orderIndex={orderIndex}
                                    itemIndex={itemIndex}
                                    jainCount={item.jainCount}
                                    tableData={tableData}
                                    setTableData={setTableData}
                                    // data={preparing}
                                    // setData={setPreparing}
                                />
                            ) : (
                                "NA"
                            )}
                        </TableCell>
                        <TableCell>
                            {item.normalCount !== undefined ? (
                                <Counter
                                    orderIndex={orderIndex}
                                    itemIndex={itemIndex}
                                    normalCount={item.normalCount}
                                    tableData={tableData}
                                    setTableData={setTableData}
                                    // data={preparing}
                                    // setData={setPreparing}
                                />
                            ) : (
                                "NA"
                            )}
                        </TableCell>
                    </TableRow>
                );
            });
        }
    });

    return components;
};

const EditableTableOrders = (props) => {
    const classes = useStyle();
    const {tableData, setTableData} = props;
    const [btnText, setBtnText] = useState("Save Changes");

    const handleSaveChange = () => {
        //save changes using api call
        setBtnText("Please Wait...");
        axios
            .post(`${baseURL}/api/v1/orders/updateOrders`, {
                token: props.staff.token,
                orders: tableData,
            })
            .then((res) => {
                props.setEditable(false);
                setBtnText("Save Changes");
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText("Save Changes");
            });
    };

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
                    style={{
                        backgroundColor: props.app.themeColor,
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "Product-Sans",
                    }}
                    onClick={handleSaveChange}
                    disabled={
                        btnText.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText}
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
                        {renderTables(
                            "placed",
                            tableData,
                            setTableData,
                            classes
                        )}
                    </TableBody>
                </Table>

                <Table style={{ backgroundColor: "#F5F5F5" }}>
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
                        {renderTables(
                            "cooked",
                            tableData,
                            setTableData,
                            classes
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

const mapStateToProps = ({ app, staff }) => ({ app, staff });
export default connect(mapStateToProps)(EditableTableOrders);
