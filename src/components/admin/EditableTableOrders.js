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

//State Management
import { connect } from "react-redux";

// Tempimages
import c1 from "./../../assets/catogery/c1 (1).png";
import c2 from "./../../assets/catogery/c1 (2).png";
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

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

const handleSaveChange = (setEditable) => {
    //save changes using api call
    setEditable(false);
};

let preparingData = [
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

let servedData = [
    {
        id: "789ghi",
        img: c3,
        name: "Manchurian",
        category: "Chines Food",
        rating: 1,
        mealFor: 1,
        price: 100,
        normalCount: 4,
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
        jainCount: 6,
        normalCount: 3,
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
        normalCount: 2,
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
        normalCount: 5,
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
        normalCount: 7,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
    },
];

const EditableTableOrders = (props) => {
    const classes = useStyle();

    const [preparing, setPreparing] = useState(preparingData);
    const [served, setServed] = useState(servedData);
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
                        backgroundColor: props.theme.primary,
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "Product-Sans",
                    }}
                    onClick={() => {
                        handleSaveChange(props.setEditable);
                    }}
                >
                    Save Changes
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
                    1
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
                        {preparing.map((item, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className={classes.tableBody}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.jainCount ? (
                                            <Counter
                                                jainCount={item.jainCount}
                                                itemId={item.id}
                                                data={preparing}
                                                setData={setPreparing}
                                            />
                                        ) : (
                                            "NA"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.normalCount ? (
                                            <Counter
                                                normalCount={item.normalCount}
                                                itemId={item.id}
                                                data={preparing}
                                                setData={setPreparing}
                                            />
                                        ) : (
                                            "NA"
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
                        {served.map((item, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className={classes.tableBody}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.jainCount ? (
                                            <Counter
                                                jainCount={item.jainCount}
                                                itemId={item.id}
                                                data={served}
                                                setData={setServed}
                                            />
                                        ) : (
                                            "NA"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.normalCount ? (
                                            <Counter
                                                normalCount={item.normalCount}
                                                itemId={item.id}
                                                data={served}
                                                setData={setServed}
                                            />
                                        ) : (
                                            "NA"
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

const mapStateToProps = ({ theme }) => ({ theme });
export default connect(mapStateToProps)(EditableTableOrders);
