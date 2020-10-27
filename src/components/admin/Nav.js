import React from "react";

// Components
import { Typography, Button } from "@material-ui/core";

//State Management
import { connect } from "react-redux";

//Routing
import { Link } from "react-router-dom";

// svgs
import { ReactComponent as Home } from "./../../assets/dashboardAssets/home.svg";
import { ReactComponent as Orders } from "./../../assets/dashboardAssets/orders.svg";
import { ReactComponent as Staff } from "./../../assets/dashboardAssets/staff.svg";
import { ReactComponent as Inventory } from "./../../assets/dashboardAssets/inventory.svg";
import { ReactComponent as Settings } from "./../../assets/dashboardAssets/settings.svg";
import { ReactComponent as MenuIcon } from "./../../assets/dashboardAssets/menu.svg";
import Hide from "./../../assets/dashboardAssets/hide.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
    nav: {
        display: "grid",
        gridAutoRows: "auto",
        marginTop: "2rem",
    },
    navItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: ".5rem 0",
        transition: "all .2s",
        borderRadius: "0 .6rem .6rem 0",
        margin: ".2rem 0",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
        },

        "&:hover > div > svg": {
            fill: "#fff",
        },
    },
    navItemText: {
        marginTop: ".3rem",
        fontFamily: "Product-Sans",
        fontWeight: "bold",
    },
    navItemImg: {
        width: "2.8rem",
        height: "2.8rem",
    },
}));

const Nav = (props) => {
    const classes = useStyle();

    const navItem = [
        {
            logo: Home,
            title: "Home",
            link: "/admin/dashboard",
        },
        {
            logo: Orders,
            title: "Orders",
            link: "/admin/dashboard/orders",
        },
        {
            logo: MenuIcon,
            title: "Menu",
            link: "/admin/dashboard/menu",
        },
        {
            logo: Staff,
            title: "Staff",
            link: "/admin/dashboard/staff",
        },
        {
            logo: Inventory,
            title: "Inventory",
            link: "/admin/dashboard/inventory",
        },
        {
            logo: Settings,
            title: "Settings",
            link: "/admin/dashboard/setting",
        },
    ];

    return (
        <div className={classes.nav}>
            {navItem.map((item, index) => {
                let Logo = item.logo;
                return (
                    <Link
                        to={item.link}
                        key={index}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            className={classes.navItem}
                            style={{
                                backgroundColor:
                                    window.location.pathname === item.link
                                        ? props.app.themeColor
                                        : null,
                            }}
                        >
                            <div>
                                <Logo
                                    className={classes.navItemImg}
                                    style={{
                                        fill:
                                            window.location.pathname ===
                                            item.link
                                                ? "#fff"
                                                : null,
                                    }}
                                />
                            </div>
                            {/* <img
                src={item.logo}
                alt="home"
                className={classes.navItemImg}
              /> */}
                            <Typography
                                variant="body2"
                                align="center"
                                className={classes.navItemText}
                                style={{
                                    color:
                                        window.location.pathname === item.link
                                            ? "#fff"
                                            : null,
                                }}
                            >
                                {item.title}
                            </Typography>
                        </div>
                    </Link>
                );
            })}
            <div style={{ marginTop: "auto" }}>
                <Button
                    startIcon={
                        <img src={Hide} alt="hide" style={{ width: "1rem" }} />
                    }
                    size="small"
                >
                    hide
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(Nav);
