import React, { useState, useEffect, useRef } from "react";

// components
import TopLogo from "./../../components/general/TopLogo";
import OrderList from "./../../components/customer/OrderList";
import CrossSale from "./../../components/customer/CrossSale";
import { Typography, TextField, Button } from "@material-ui/core";
import Navigation from "./../../components/customer/Navigation";
import NeedHelp from "./../../components/customer/NeedHelp";
import RecivedOrdersList from "./../../components/customer/RecivedOrdersList";

// components
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

//state management
import { connect } from "react-redux";
//actions
import { fetchMenuItems } from "./../../actions/customer";

// api
import axios from "axios";

//variables
import { baseURL } from "./../../variables";

//Socket
import socket from "../../socket";

//routing
import { Link, useHistory } from "react-router-dom";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    heading: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        marginTop: "6rem",
        marginLeft: "1rem",
    },
    subTitle: {
        fontSize: "2rem",
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        marginRight: "1rem",
    },
    subsubTitle: {
        fontFamily: "Product-Sans",
        fontSize: "1.3rem",
        marginLeft: ".8rem",
    },
    link: {
        fontFamily: "Product-Sans",
        textDecoration: "none",
        color: "inherit",
    },
    btnContainer: {
        margin: ".8rem",
        display: "flex",
        "& > a": {
            marginLeft: "auto",
        },
    },
});

const Orders = (props) => {
    const classes = useStyle();
    const [instructions, setInstructions] = useState("");
    const [count, setCount] = useState(0);
    const [btnText, setBtnText] = useState("order now");
    const { menu, tableNo } = props;
    let orderItems = useRef([]);
    const totalPrice = useRef(0);
    const history = useHistory();

    useEffect(() => {
        if (tableNo === null) {
            alert(
                "ILLEAGLE ACCESS, please scan the qr login from that page and while using the app do not refresh or direct open any link of this app"
            );
        }
    }, [tableNo]);

    useEffect(() => {
        let calcCount = 0;
        totalPrice.current = 0;
        orderItems.current = [];
        menu.forEach((item) => {
            if (item.normalCount > 0 || item.jainCount > 0) {
                calcCount++;
                orderItems.current.push(item);
                if (item.normalCount !== undefined) {
                    totalPrice.current =
                        totalPrice.current + item.price * item.normalCount;
                }

                if (item.jainCount !== undefined) {
                    totalPrice.current =
                        totalPrice.current + item.price * item.jainCount;
                }
            }
        });
        setCount(calcCount);
    }, [menu, orderItems, totalPrice]);

    const handleOrders = () => {
        if (tableNo === null) {
            alert(
                "please scan the qr login from that page and while using the app do not refresh or direct open any link of this app"
            );
            return;
        }

        if (orderItems.current.length <= 0) {
            alert("Please Select items before ordering");
            return;
        }

        setBtnText("please wait...");
        let order = {
            items: orderItems.current,
            tableNo: tableNo,
            comment: instructions,
            totalPrice: totalPrice.current,
            email: props.user.email,
            name: props.user.name,
            phoneNo: props.user.phoneNumber ? props.user.phoneNumber : null,
            dataOfBirth: props.user.dataOfBirth ? props.user.dataOfBirth : null,
            token: props.user.token,
        };
        axios
            .post(`${baseURL}/api/v1/orders/placeorder`, order)
            .then(() => {
                props.fetchMenuItems();
                socket.emit("ORDER_PLACED")
                setBtnText("Order Now");
                history.push("/customer/orderconfirm");
            })
            .catch((err) => {
                alert(err);
                setBtnText("Order Now");
            });
    };

    return (
        <>
            <TopLogo />
            <Typography variant="h4" align="left" className={classes.heading}>
                Review Your order
            </Typography>
            <OrderList />
            <div style={{ margin: "1rem" }}>
                <TextField
                    id="standard-basic"
                    label="Add Cooking Instructions (Optional)"
                    multiline
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>
            <Typography variant="h3" align="right" className={classes.subTitle}>
                Dishes Selected {count}
            </Typography>
            <div className={classes.btnContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    onClick={handleOrders}
                    disabled={
                        btnText.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText}
                </Button>
            </div>

            <div>
                <Typography
                    variant="h6"
                    align="left"
                    className={classes.subsubTitle}
                >
                    Your Orders
                </Typography>
                <RecivedOrdersList />
            </div>

            <Typography
                variant="h6"
                align="left"
                className={classes.subsubTitle}
            >
                Take some side dishes
            </Typography>
            <div style={{ margin: ".8rem", marginBottom: "5rem" }}>
                <CrossSale />
            </div>
            <Navigation>
                <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                    <NeedHelp />
                    <Link
                        to="/customer"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button variant="contained" color="primary">
                            Menu
                        </Button>
                    </Link>
                </div>
            </Navigation>
        </>
    );
};

const mapStateToProps = ({ menu, tableNo, user }) => ({ menu, tableNo, user });

export default connect(mapStateToProps, { fetchMenuItems })(Orders);
