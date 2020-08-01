import React from "react";

//Components
import { Paper, Button, Typography } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import ShowAndPrintBill from "./../../components/admin/ShowAndPrintBill";
import AllOrders from "./../../components/admin/AllOrders";

//images
import logo from "./../../assets/logo.png";
import logout from "./../../assets/dashboardAssets/logout.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "80px 350px 1fr 150px",
    gridTemplateRows: "100px 1fr",
    gridGap: "1rem",
    height: "100vh",
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
  },
}));
const Orders = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Paper className={classes.menuContainer}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img src={logo} alt="logo" className={classes.logo} />
          <Nav />
        </div>
      </Paper>

      <div
        style={{ gridColumn: "2 / -1", display: "flex", alignItems: "center" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "8rem", margin: "0 auto" }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<img src={logout} alt="logout" style={{ width: "1rem" }} />}
          style={{ margin: "1rem" }}
        >
          Logout
        </Button>
      </div>

      <div>
        <ShowAndPrintBill />
      </div>

      <div>
        <AllOrders />
      </div>

      <div>
        <Typography variant="h6" align="left" className={classes.heading}>
          Order Stats
        </Typography>

        <div className={classes.statBox}>
          <span className={classes.title}>Orders</span>
          <span className={classes.quantity}>25</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Served</span>
          <span className={classes.quantity}>16</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Preparing</span>
          <span className={classes.quantity}>10</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
