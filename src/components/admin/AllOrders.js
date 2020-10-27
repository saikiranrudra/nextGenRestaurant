import React, { useState, useEffect } from "react";

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

//API
import axios from "axios";
//Variable
import {baseURL} from "./../../variables";

// Utils
import {
        getTableNo,
        getFormatedDate,
        timeFormat,
        totalCostOforders,
        formatDate
    } from "./../../utils/functions";

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

const filterCheck = (filters, transection, tables) => {
    let tableNo = true;
    let mode = true;
    let dish = true;
    
    if(filters.dish !== undefined && filters.dish !== "") {
        dish = false;

        transection.orders.forEach(order => {
            for(let i = 0; i < order.items.length; i++) {
                if(order.items[i].name.toLowerCase().includes(filters.dish)) {
                    dish = true;
                    break;
                }
            }
        })

    }

    if(filters.tableNo !== undefined && filters.tableNo !== "") {
        tableNo = getTableNo(tables, transection.tableNo) === parseInt(filters.tableNo) ? true : false;
    }

    if(filters.mode === "online") {
        mode = transection.transectionId !== undefined ? true : false;
    } else if(filters.mode === "offline") {
        mode = transection.transectionId === undefined ? true : false;
    }
 
    console.log("tableNo: ", tableNo);
    console.log("mode: ", mode);
    console.log("dish: ", dish);
    console.log("(tableNo && mode && dish): ", (tableNo && mode && dish));

    return (tableNo && mode && dish);
}

// Transition Component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AllOrders = (props) => {
    const classes = useStyle();
    const {selectedOrder, setSelectedOrder} = props;
    const [transection, setTransection] = useState([]);
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [filters, setFilters] = useState({date: formatDate(Date()), mode: "both"})
    const [search, setSearch] = useState("");

    // TESTING
    useEffect(() => {
        console.log(filters);
    }, [filters])

    useEffect(() => {
        if(props.staff !== null) {
        
            axios.post(`${baseURL}/api/v1/transection/getTransectionByDate`, { 
                token: props.staff.token, 
                date: filters.date 
            })
                .then((res) => {
                    setTransection(res.data.data);              
                }).catch((err) => {
                    alert(err);
                    console.log(err);
                })
     }
    }, [props.staff, filters.date])


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
                            value={search}
                            onChange={e => {setSearch(e.target.value)}}
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
                                    <b>Transection Id</b>
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
                            {transection.map((obj, index) => {
                                if(
                                    (obj._id.toLowerCase().includes(search) 
                                    || obj.name.toLowerCase().includes(search))
                                    && filterCheck(filters, obj, props.tables)
                                    ) {
                                    return (
                                        <TableRow
                                            key={index}
                                            onClick={() => setSelectedOrder(obj)}
                                            className={classes.tableBody}
                                            style={{
                                                backgroundColor:
                                                    selectedOrder._id ===
                                                    obj._id
                                                        ? props.app.themeColor
                                                        : null,
                                            }}
                                            hover
                                        >
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {obj._id}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {getFormatedDate(obj.createdAt)}{/*date*/}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {timeFormat(obj.orders[0].createdTimeStamp)} {/*inTime*/}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {timeFormat(obj.createdAt)} {/*outTime*/}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {getTableNo(props.tables, obj.tableNo)} 
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {obj.name}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {obj.transectionId === undefined ? "offline" : "online"}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    color:
                                                        selectedOrder._id ===
                                                        obj._id
                                                            ? "#fff"
                                                            : null,
                                                }}
                                            >
                                                {totalCostOforders(obj.orders)} {" ₹"}
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else {
                                    return null;
                                }
                                
                            })}
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
                <input 
                    type="date" id="date" 
                    className={classes.input} 
                    value={filters.date} 
                    onChange={(e) => { setFilters({...filters, date: e.target.value}) }}                    
                />

                <label htmlFor="tableNo" className={classes.label}>
                    Table Number
                </label>
                <input 
                    type="number" 
                    id="tableNo" 
                    className={classes.input} 
                    value={filters.tableNo} 
                    onChange={(e) => { setFilters({...filters, tableNo: e.target.value}) }}                       
                />

                <label htmlFor="paymentMethod" className={classes.label}>
                    Payment Method
                </label>
                <select
                    name="paymentMethods"
                    id="paymentMethod"
                    className={classes.input}
                    value={filters.mode} 
                    onChange={(e) => { setFilters({...filters, mode: e.target.value}) }}
                >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="both">Both</option>
                </select>

                <label htmlFor="dish" className={classes.label}>
                    Dish
                </label>
                <input 
                    type="text" 
                    id="dish" 
                    className={classes.input} 
                    value={filters.dish} 
                    onChange={(e) => { setFilters({...filters, dish: e.target.value}) }}                      
                />
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

const mapStateToProps = ({ app, staff, tables }) => ({ app, staff, tables });

export default connect(mapStateToProps)(AllOrders);
