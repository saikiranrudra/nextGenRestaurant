import React, { useState } from "react";

//components
import {
    Typography,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog,
    DialogTitle,
    Button,
} from "@material-ui/core";

//State Management
import { connect } from "react-redux";

//Icons
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

// Transition
import Slide from "@material-ui/core/Slide";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
    heading: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 0,
        marginBottom: "1.2rem",
        paddingTop: "0.5rem",
    },
    container: {
        backgroundColor: "#F5F5F5",
    },
    searchContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 48px",
        alignItems: "center",
        borderRadius: "4px",
        padding: "0 1rem",
        gridGap: ".3rem",
        paddingTop: "1.8rem",
    },
    searchInput: {
        outline: "none",
        border: "none",
        fontFamily: "Product-Sans",
        "&::placeholder": {
            color: "#D9D9D9",
        },
    },
    search: {
        display: "grid",
        gridTemplateColumns: "24px 1fr",
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%",
        padding: "0 1rem",
        borderRadius: "4px",
    },
    table: {
        overflowX: "hidden",
        overflowY: "auto",
        height: "74vh",
    },
    label: {
        margin: "1rem 0 .2rem 1.5rem",
        fontFamily: "Product-Sans",
        fontWeight: "bold",
    },
    input: {
        margin: ".4rem 1.5rem",
        padding: ".4rem",
        fontSize: "1rem",
        fontFamily: "Product-Sans",
    },
    dialog: {
        "& > .MuiDialog-paperWidthSm": {
            padding: "1rem",
        },
    },
    head: {
        "& > th": {
            fontFamily: "Product-Sans",
            color: "#989898",
            fontSize: ".8rem",
        },
    },
    tableBody: {
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            cursor: "pointer",
        },
    },
});

let dummyOrders = [
    {
        orderNumber: "123456464324sdadasd1as",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadasd2as",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas3das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas4das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas5das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdad6asdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada7sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas8das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas9das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadasd10as",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdad11asdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sd12adasdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada13sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada14sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada15sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada16sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada17sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdada18sdas",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
    {
        orderNumber: "123456464324sdadas19das",
        date: "25/5/2020",
        timeIn: "15:36",
        timeOut: "16:02",
        tableNo: "5",
        name: "Surname Name",
        paymentMethod: "offline",
        totalBill: 2564,
    },
];

// Transition Component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AllOrders = (props) => {
    const classes = useStyle();
    const [selectedOrder, setSelectedOrder] = useState({});
    const [dialogVisibility, setDialogVisibility] = useState(false);

    const handleClose = () => {
        setDialogVisibility(false);
    };

    return (
        <>
            <Typography variant="h6" align="left" className={classes.heading}>
                Orders
            </Typography>
            <div style={{ backgroundColor: "#F5F5F5", borderRadius: "8px" }}>
                <div className={classes.searchContainer}>
                    <div className={classes.search}>
                        <SearchIcon style={{ color: "#D9D9D9" }} />
                        <input
                            type="text"
                            placeholder="Search"
                            className={classes.searchInput}
                        />
                    </div>

                    <div
                        style={{ backgroundColor: "#fff", borderRadius: "4px" }}
                    >
                        <IconButton onClick={() => setDialogVisibility(true)}>
                            <FilterListIcon />
                        </IconButton>
                    </div>
                </div>

                <div className={classes.table}>
                    <Table style={{ backgroundColor: "#F5F5F5" }}>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>
                                    <b>OrderNumber</b>
                                </TableCell>
                                <TableCell>
                                    <b>Date</b>
                                </TableCell>
                                <TableCell>
                                    <b>Time In</b>
                                </TableCell>
                                <TableCell>
                                    <b>Time Out</b>
                                </TableCell>
                                <TableCell>
                                    <b>Table Number</b>
                                </TableCell>
                                <TableCell>
                                    <b>Name</b>
                                </TableCell>
                                <TableCell>
                                    <b>Payment Method</b>
                                </TableCell>
                                <TableCell>
                                    <b>Total Bill</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dummyOrders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() => setSelectedOrder(order)}
                                    className={classes.tableBody}
                                    style={{
                                        backgroundColor:
                                            selectedOrder.orderNumber ===
                                            order.orderNumber
                                                ? props.theme.primary
                                                : null,
                                    }}
                                    hover
                                >
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.orderNumber}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.date}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.timeIn}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.timeOut}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.tableNo}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.name}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.paymentMethod}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color:
                                                selectedOrder.orderNumber ===
                                                order.orderNumber
                                                    ? "#fff"
                                                    : null,
                                        }}
                                    >
                                        {order.totalBill} {" ₹"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dialog
                onClose={handleClose}
                open={dialogVisibility}
                TransitionComponent={Transition}
                className={classes.dialog}
            >
                <DialogTitle>Filter By</DialogTitle>
                <label htmlFor="date" className={classes.label}>
                    Date
                </label>
                <input type="date" id="date" className={classes.input} />

                <label htmlFor="tableNo" className={classes.label}>
                    Table Number
                </label>
                <input type="number" id="tableNo" className={classes.input} />

                <label htmlFor="paymentMethod" className={classes.label}>
                    Payment Method
                </label>
                <select
                    name="paymentMethods"
                    id="paymentMethod"
                    className={classes.input}
                >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                </select>

                <label htmlFor="dish" className={classes.label}>
                    Dish
                </label>
                <input type="text" id="dish" className={classes.input} />
                <center>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: ".6rem 0 1.5rem 0" }}
                        onClick={handleClose}
                    >
                        Filter!
                    </Button>
                </center>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(AllOrders);
