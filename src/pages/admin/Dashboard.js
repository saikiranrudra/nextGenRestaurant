import React, { useState } from "react";

// Components
import { Paper, Button, Typography } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import LiveTables from "./../../components/admin/LiveTables";
import BasicStats from "./../../components/admin/BasicStats";
import Notifications from "./../../components/admin/Notifications";
import TableOrders from "./../../components/admin/TableOrders";
import EditableTableOrders from "./../../components/admin/EditableTableOrders";

// images
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "80px 209px 345px 1fr 395px",
    gridTemplateRows: "100px 1fr",
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
  },
}));
const Dashboard = () => {
  const classes = useStyle();
  const [editable, setEditable] = useState(false);
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
          endIcon={<Logout style={{ width: "1rem", fill: "#fff" }} />}
          style={{ margin: "1rem" }}
        >
          Logout
        </Button>
      </div>

      <div style={{ paddingLeft: "1rem" }}>
        <span className={classes.activeTableCount}>6</span>
        <span className={classes.totalTableCount}>/20</span>
        <Typography variant="h6" align="left" className={classes.title}>
          Active Tables
        </Typography>

        <LiveTables />
      </div>
      <div>
        {editable ? (
          <EditableTableOrders setEditable={setEditable} />
        ) : (
          <TableOrders setEditable={setEditable} />
        )}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" align="left" className={classes.title}>
            Notifications
          </Typography>
          <Typography
            variant="body2"
            className={classes.red}
            style={{ cursor: "pointer" }}
          >
            clear all
          </Typography>
        </div>
        <div style={{ backgroundColor: "#F5F5F5", borderRadius: "8px" }}></div>
        <Notifications />
      </div>

      <div style={{ paddingRight: "2rem" }}>
        <BasicStats />
      </div>
    </div>
  );
};

export default Dashboard;
