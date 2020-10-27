import React, { useState } from "react";

//components
import { Drawer, IconButton, Typography } from "@material-ui/core";

// Routing
import { Link } from "react-router-dom";

//Variables
import { baseURL } from "./../../variables";

//API
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

// images
import { Menu } from "@material-ui/icons";
import logo from "./../../assets/logo.png";

const useStyle = makeStyles((theme) => ({
    logo: {
        width: "10rem",
        margin: "1rem",
    },
    container: {
        marginTop: "3.2rem",
    },
    menuItem: {
        fontSize: "1.3rem",
        fontFamily: "Product-Sans",
        padding: ".8rem",
        fontWeight: "bold",
        "&:active": {
            backgroundColor: theme.palette.primary.main,
            color: "#eee",
        },
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
}));

const CustomerMenu = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();
    return (
        <>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <img
                    src={
                        props.app.img !== undefined
                            ? `${baseURL}${props.app.img}`
                            : logo
                    }
                    className={classes.logo}
                    alt="logo"
                />
                <div className={classes.container}>
                    <Link to="/customer/home" className={classes.link}>
                        <Typography
                            className={classes.menuItem}
                            variant="h4"
                            align="right"
                            color="primary"
                        >
                            Menu
                        </Typography>
                    </Link>

                    <Link to="/customer/orders" className={classes.link}>
                        <Typography
                            className={classes.menuItem}
                            variant="h4"
                            align="right"
                            color="primary"
                        >
                            View my orders
                        </Typography>
                    </Link>
                    <Link to="/customer/points" className={classes.link}>
                        <Typography
                            className={classes.menuItem}
                            variant="h4"
                            align="right"
                            color="primary"
                        >
                            View my points
                        </Typography>
                    </Link>

                    <Link to="/customer/paybill" className={classes.link}>
                        <Typography
                            className={classes.menuItem}
                            variant="h4"
                            align="right"
                            color="primary"
                        >
                            Pay My Bill
                        </Typography>
                    </Link>
                </div>
            </Drawer>
            <IconButton onClick={() => setOpen(true)}>
                <Menu />
            </IconButton>
        </>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(CustomerMenu);
