import React, {useState} from "react";

//Components
import { Paper, Button, Typography } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import ShowAndPrintBill from "./../../components/admin/ShowAndPrintBill";
import AllOrders from "./../../components/admin/AllOrders";

// StateManagemnet
import { connect } from "react-redux";
//Actions
import { staffLogin } from "./../../actions/customer";

// Utils
import {countOrdersBaseOnState} from "./../../utils/functions";

// Variables
import { baseURL } from "./../../variables";

//images
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 277px 1fr 193px",
        gridTemplateRows: "58px 1fr",
        gridGap: "1rem",
        height: "100vh",
        backgroundColor: "#fff",
    },
    menuContainer: {
        display: "flex",
        flexDirection: "row",
        gridRow: "span 2",
        justifyContent: "center",
    },
    logo: {
        width: "4rem",
        marginTop: "1rem",
    },
    heading: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 0,
        marginBottom: "1.2rem",
        paddingTop: "0.5rem",
    },
    statBox: {
        margin: "1.2rem 0",
    },
    title: {
        display: "block",
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
    },
    quantity: {
        display: "block",
        fontFamily: "Product-Sans",
        fontSize: "4rem",
        fontWeight: "bold",
        color: theme.palette.primary.main,
        lineHeight: 1,
    },
}));
const Orders = (props) => {
    const classes = useStyle();
    const [selectedOrder, setSelectedOrder]  = useState({ orders:[]});
    
    return (
        <div className={classes.container}>
            <Paper className={classes.menuContainer}>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                        src={
                            props.app.img ? `${baseURL}${props.app.img}` : logo
                        }
                        alt="logo"
                        className={classes.logo}
                    />
                    <Nav />
                </div>
            </Paper>

            <div
                style={{
                    gridColumn: "2 / -1",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ width: "8rem", margin: "0 auto" }}></span>
                {/* <img
          src={logo}
          alt="logo"
          style={{ width: "8rem", margin: "0 auto" }}
        /> */}
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Logout style={{ width: "1rem", fill: "#fff" }} />}
                    style={{ margin: "1rem" }}
                    onClick={() => {
                        props.staffLogin(null);
                    }}
                >
                    Logout
                </Button>
            </div>

            <div>
                <ShowAndPrintBill selectedOrder={selectedOrder}/>
            </div>

            <div>
                <AllOrders 
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />
            </div>

            <div>
                <Typography
                    variant="h6"
                    align="left"
                    className={classes.heading}
                >
                    Order Stats
                </Typography>

                <div className={classes.statBox}>
                    <span className={classes.title}>Orders</span>
                    <span className={classes.quantity}>{selectedOrder.orders.length}</span>
                </div>

                <div className={classes.statBox}>
                    <span className={classes.title}>Served</span>
                <span className={classes.quantity}>
                    {countOrdersBaseOnState(selectedOrder.orders, ["payed", "cooked"])}
                </span>
                </div>

                <div className={classes.statBox}>
                    <span className={classes.title}>Preparing</span>
                    <span className={classes.quantity}>
                        {countOrdersBaseOnState(selectedOrder.orders, ["placed"])}
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps, { staffLogin })(Orders);
