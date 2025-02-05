import React, { useState, useEffect } from "react";

// images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

import socket from "./../../socket";

// API management
import axios from "axios";

//Variable
import { baseURL } from "./../../variables";

// Components
import { Typography, Button } from "@material-ui/core";
import LoginWithGoogle from "./../../components/customer/LoginWIthGoogle";
import EmailTextField from "../../components/customer/EmailTextField";
import NeedHelp from "./../../components/customer/NeedHelp";
import Navigation from "./../../components/customer/Navigation";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Routing
import { Link, useHistory, useLocation } from "react-router-dom";

//state management
import { connect } from "react-redux";
// actions
import { customerAuthenticate, setTableNo } from "./../../actions/customer";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles({
    logo: {
        textAlign: "center",
        marginTop: "2.8rem",
        "& > img": {
            width: "15rem",
        },
    },

    heading: {
        fontFamily: "Product-Sans",
        fontWeight: "normal",
        fontSize: "2.9rem",
        marginTop: "2.3rem",
    },
    subHeading: {
        fontSize: ".8rem",
    },
    authSection: {
        textAlign: "center",
        marginTop: "1rem",
    },

    text: {
        fontSize: ".8rem",
        fontWeight: "bold",
        marginTop: ".3rem",
    },
    container: {
        marginTop: ".3rem",
        textAlign: "center",
    },
    btn: {
        fontFamily: "Product-Sans",
        borderRadius: "3rem",
        padding: ".3rem 2.4rem",
        fontSize: ".9rem",
    },
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Auth = (props) => {
    const classes = useStyle();
    const history = useHistory();
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        type: "error",
    });
    let query = useQuery();
    const { setTableNo, tableNo } = props;

    const handleClose = (event, reason) => {
        setNotification({ ...notification, open: false });
    };

    // handle authentication
    const handleAuth = () => {
        // handle authentication here
        // if authenticated
        if (props.email === "") {
            setNotification({
                open: true,
                type: "error",
                message: "Please enter your email",
            }); //shows enter email error
            return;
        }

        axios
            .post(`${baseURL}/api/v1/users/signin`, { email: props.email })
            .then((res) => {
                props.customerAuthenticate(res.data.data);
                history.push("/customer/home");
            })
            .catch((err) => {
                console.log(err);
                if (err.response !== undefined) {
                    setNotification({
                        open: true,
                        type: "warning",
                        message: err.response.data.message,
                    });
                } else {
                    setNotification({
                        open: true,
                        type: "error",
                        message: "Something went wrong try again later",
                    });
                }
            });
    };

    useEffect(() => {
        if (tableNo === null && query.get("tableNo") === null) {
            alert("please scan the qr and while using this app do not refresh or edit url");
        } else {
            if (query.get("tableNo") !== null) {
                const tableNo = query.get("tableNo")
                axios.post(`${baseURL}/api/v1/table/updateTable`, {_id: tableNo, isVacant: false})
                    .then(res => {
                        setTableNo(tableNo);
                        socket.emit("UPDATED_TABLES");
                    }).catch(err => {
                        console.log(err);
                        alert("Something went wrong Please rescan the QR")
                    })
            }
        }
        
    }, [query, setTableNo, tableNo]);

    useEffect(() => {
        if (props.user !== null) {
            if (props.user.email !== undefined) {
                history.push("/customer/home");
            }
        }
    });

    return (
        <>
            <div className={classes.logo}>
                <img
                    src={props.app.img ? `${baseURL}${props.app.img}` : logo}
                    alt="logo"
                />
            </div>

            <div>
                <Typography
                    variant="h3"
                    align="center"
                    className={classes.heading}
                >
                    Welcome!
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    className={classes.subHeading}
                >
                    Please Login for your order
                </Typography>
            </div>

            <div className={classes.authSection}>
                {props.app.state === "online" ? <LoginWithGoogle /> : null}
            </div>

            <Typography variant="body1" align="center" className={classes.text}>
                {props.app.state === "online" ? "Or" : null}
            </Typography>

            <div className={classes.container}>
                <EmailTextField />
            </div>
            <div style={{ marginTop: ".6rem" }} className={classes.container}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={handleAuth}
                >
                    Login
                </Button>
            </div>

            <div style={{ margin: "2rem 0 " }} className={classes.container}>
                <Typography variant="body2">New Here?</Typography>
                <Link
                    to="/customer/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "3rem" }}
                        className={classes.btn}
                    >
                        Sign Up
                    </Button>
                </Link>
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={notification.type}>
                        {notification.message}
                    </Alert>
                </Snackbar>
                <Navigation>
                    <NeedHelp />
                </Navigation>
            </div>
        </>
    );
};

const mapStateToProps = ({ user, email, tableNo, app }) => ({
    user,
    email,
    tableNo,
    app,
});
export default connect(mapStateToProps, {
    customerAuthenticate,
    setTableNo,
})(Auth);
