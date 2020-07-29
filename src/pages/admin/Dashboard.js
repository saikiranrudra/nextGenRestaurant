import React from "react";

// Components
import { Paper, Button, Typography } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import LiveTables from "./../../components/admin/LiveTables";
import BasicStats from "./../../components/admin/BasicStats";
import Notifications from "./../../components/admin/Notifications";
import TableOrders from "./../../components/admin/TableOrders";

// images
import logo from "./../../assets/logo.png";
import logout from "./../../assets/dashboardAssets/logout.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "80px 230px .8fr 1fr 380px",
    gridTemplateRows: "100px 1fr",
    gridGap: "3px",
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
}));
const Dashboard = () => {
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

      <div style={{ paddingLeft: "1rem" }}>
        <span className={classes.activeTableCount}>6</span>
        <span className={classes.totalTableCount}>/20</span>
        <Typography
          variant="h6"
          align="left"
          style={{ fontFamily: "Product-Sans", fontWeight: "bold" }}
        >
          Active Tables
        </Typography>

        <LiveTables />
      </div>
      <div>
        <TableOrders />
      </div>
      <div>
        <Typography variant="h6" align="left" style={{ fontWeight: "bold" }}>
          Notifications
        </Typography>
        <div style={{ backgroundColor: "#F5F5F5", borderRadius: "8px" }}></div>
        <Notifications />
      </div>

      <div>
        <BasicStats />
      </div>

      <div></div>
      <div></div>
    </div>
  );
};

export default Dashboard;
