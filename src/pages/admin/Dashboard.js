import React, { useState, useEffect } from "react";

// Components
import { Paper, Button, Typography } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import LiveTables from "./../../components/admin/LiveTables";
import BasicStats from "./../../components/admin/BasicStats";
import Notifications from "./../../components/admin/Notifications";
import TableOrders from "./../../components/admin/TableOrders";
import EditableTableOrders from "./../../components/admin/EditableTableOrders";

// API
import axios from "axios";
// Variables
import { baseURL } from "./../../variables";

// Utils
import _ from "lodash";

// images
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//state management
import { connect } from "react-redux";
//Actions
import { fetchIngredients, staffLogin } from "./../../actions/customer";

//Socket
import socket from "./../../socket";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 209px 345px 1fr 390px",
        height: "100vh",
        gridTemplateRows: "58px 1fr",
        gridGap: "1rem",
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
    activeTableCount: {
        fontFamily: "Product-Sans",
        fontSize: "5rem",
        fontWeight: "bold",
        color: theme.palette.primary.main,
    },
    totalTableCount: {
        fontFamily: "Product-Sans",
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#989898",
    },
    title: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
    },
    red: {
        color: theme.palette.primary.main,
        fontFamily: "Product-Sans",
        fontWeight: "bold",
    },
}));
const Dashboard = (props) => {
    const classes = useStyle();
    const [editable, setEditable] = useState(false);
    const { fetchIngredients } = props;
    const [notifications, setNotifications] = useState([]);
    const [selectedTable, setSeletedTable] = useState(
        props.tables.length > 0 ? props.tables[0] : null
    );

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    socket.on("ADMIN_NOTIFICATION", (notification) => {
        let newNotifications = notifications;
        _.remove(newNotifications, (n) => 
            (n.type === notification.type && n.payload.tableNo === notification.payload.tableNo)
        )
        newNotifications.unshift(notification);
        setNotifications([...newNotifications]);
    })
    
    socket.on("ADMIN_CR_NOTIFICATION", (notification) => {
        let newNotifications = notifications;
        _.remove(newNotifications, (n) => 
            (n.type === notification.type && n.payload.tableNo === notification.payload.tableNo)
        )
        newNotifications.unshift(notification);
        setNotifications([...newNotifications]);
    })

    useEffect(() => {
        if(selectedTable !== null && props.staff !== null) {
            axios.post(`${baseURL}/api/v1/orders/getOrdersByTableNo`, {
                token: props.staff.token,
                tableNo: selectedTable._id
            }).then(res => {
                setTableData(res.data.data);
            }).catch(err => {
                alert(err);
                console.log(err);
            }) 

        }
    },[selectedTable, props.staff])


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

            <div style={{ paddingLeft: "1rem" }}>
                <span className={classes.activeTableCount}>
                    {_.countBy(props.tables, table => table.isVacant)["true"] ? _.countBy(props.tables, table => table.isVacant)["true"] : "null"}
                </span>
                <span className={classes.totalTableCount}>/{props.tables.length}</span>
                <Typography variant="h6" align="left" className={classes.title}>
                    Active Tables
                </Typography>

                <LiveTables
                    setSeletedTable={setSeletedTable}
                    selectedTable={selectedTable}
                />
            </div>
            <div>
                {editable ? (
                    <EditableTableOrders
                        setEditable={setEditable}
                        tableData={tableData}
                        setTableData={setTableData}
                        selectedTable={selectedTable}
                    />
                ) : (
                    <TableOrders
                        setEditable={setEditable}
                        tableData={tableData}
                        selectedTable={selectedTable}
                    />
                )}
            </div>
            <div>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography
                        variant="h6"
                        align="left"
                        className={classes.title}
                    >
                        Notifications
                    </Typography>
                    <Button variant="text" className={classes.red} onClick={() => { setNotifications([]) }}>
                        clear all
                    </Button>
                </div>
                <div
                    style={{ backgroundColor: "#F5F5F5", borderRadius: "8px" }}
                ></div>
                <Notifications notificationsData={notifications} setNotifications={setNotifications} />
            </div>

            <div style={{ paddingRight: "2rem" }}>
                <BasicStats tableData={tableData} />
            </div>
        </div>
    );
};

const mapStateToProps = ({ app, tables, staff }) => ({ app, tables, staff });

export default connect(mapStateToProps, { fetchIngredients, staffLogin })(
    Dashboard
);
