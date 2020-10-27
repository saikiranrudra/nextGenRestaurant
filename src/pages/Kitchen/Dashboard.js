import React, { useState, useEffect } from "react";

//components
import { Typography, Paper } from "@material-ui/core";
import TableContainer from "./../../components/kitchen/TableContainer";
import SummaryList from "./../../components/kitchen/SummaryList";

//state managemment
import { connect } from "react-redux";
//Actions
import {staffLogin} from "./../../actions/customer";

//API
import axios from "axios";
//Variables
import {baseURL} from "./../../variables";

//socket
import socket from "./../../socket";

//utils
import _ from "lodash";

//images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    heading: {
        fontFamily: "Product-Sans",
        fontSize: "4rem",
        textAlign: "center",
    },
    logo: {
        width: "11rem",
    },
    logout: {
        color: theme.palette.primary.main,
        fontSize: "1.8rem",
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        cursor: "pointer",
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem 3rem",
    },

    dashboardContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 400px",
    },
    tables: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 350px)",
        margin: "1rem",
        gridGap: ".6rem",
        placeContent: "center",
    },
    summary: {
        margin: "1rem",
        alignSelf: "start",
        position: "sticky",
        top: "1rem",
    },
}));

const Dashboard = (props) => {
    const classes = useStyle();
    const [orders, setOrders] = useState([]);
    const [orderServed, setOrderServed] = useState(0);

    const calcOrderServed = () => {
        axios.get(`${baseURL}/api/v1/orders/getTodaysCookedOrders`)
          .then(res => {
            setOrderServed(res.data.data.length)
          })
          .catch(err => {
            console.log(err);
            alert(err);
            setOrderServed("ERROR")
          })
      }
    

    const fetchOrders = () => {
        axios.get(`${baseURL}/api/v1/orders/getAllPlacedOrders`)
            .then(res => {
                let newOrders = _.clone(res.data.data);
                
                newOrders.forEach(order => {
                    order.items.forEach(item => {
                        item.isCooked = false
                    })
                })
                setOrders(newOrders);
            }).catch(err => {
                alert(err);
                console.log(err);
                setOrders([]);
            })
    }

    socket.on("ORDER_PLACED", () => {
        fetchOrders();
    })

    useEffect(() => {
        fetchOrders();
        calcOrderServed();
    },[]) 
    
    return (
        <>
            <header className={classes.headerContainer}>
                <img
                    src={props.app.img ? `${baseURL}${props.app.img}` : logo}
                    alt="logo"
                    className={classes.logo}
                />
                <div className={classes.heading}>Kitchen Console</div>
                <Typography
                    variant="body1"
                    align="center"
                    className={classes.logout}
                    onClick={() => { props.staffLogin(null) }}
                >
                    Log Out
                </Typography>
            </header>
            <div className={classes.dashboardContainer}>
                <div className={classes.tables}>
                    {orders.map((order, index) => (
                        <TableContainer 
                            data={order} 
                            key={index} 
                            fetchOrders={fetchOrders} 
                            calcOrderServed={calcOrderServed}
                        />
                    ))}
                </div>

                <Paper className={classes.summary}>
                    <div style={{ position: "sticky", top: "1rem" }}>
                        <Typography
                            variant="h4"
                            align="left"
                            style={{ margin: "1rem 0 2rem 1rem" }}
                        >
                            Total Orders
                        </Typography>
                        <SummaryList orders={orders} orderServed={orderServed}/>
                    </div>
                </Paper>
            </div>
        </>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps, {staffLogin})(Dashboard);
