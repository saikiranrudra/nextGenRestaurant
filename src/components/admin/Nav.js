import React from "react";

// Components
import { Typography, Button } from "@material-ui/core";

// svgs
import home from "./../../assets/dashboardAssets/home.svg";
import orders from "./../../assets/dashboardAssets/orders.svg";
import staff from "./../../assets/dashboardAssets/staff.svg";
import inventory from "./../../assets/dashboardAssets/inventory.svg";
import settings from "./../../assets/dashboardAssets/settings.svg";
import hide from "./../../assets/dashboardAssets/hide.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  nav: {
    display: "grid",
    gridAutoRows: "85.6px",
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
    },
  },
  navItemText: {
    marginTop: ".3rem",
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  navItemImg: {
    width: "2.8rem",
  },
}));

const Nav = () => {
  const classes = useStyle();

  const navItem = [
    {
      logo: home,
      title: "Home",
    },
    {
      logo: orders,
      title: "Orders",
    },
    {
      logo: staff,
      title: "Staff",
    },
    {
      logo: inventory,
      title: "Inventory",
    },
    {
      logo: settings,
      title: "Settings",
    },
  ];

  return (
    <div className={classes.nav}>
      {navItem.map((item, index) => {
        return (
          <div className={classes.navItem} key={index}>
            <img src={item.logo} alt="home" className={classes.navItemImg} />
            <Typography
              variant="body2"
              align="center"
              className={classes.navItemText}
            >
              {item.title}
            </Typography>
          </div>
        );
      })}
      <div style={{ marginTop: "auto" }}>
        <Button
          startIcon={<img src={hide} alt="hide" style={{ width: "1rem" }} />}
          size="small"
        >
          hide
        </Button>
      </div>
    </div>
  );
};

export default Nav;
