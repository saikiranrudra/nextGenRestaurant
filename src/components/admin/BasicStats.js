import React,{ useEffect, useState } from "react";

//components
import { Typography } from "@material-ui/core";

//State Management
import {connect} from "react-redux";

// utils
import _ from "lodash";

//API
import axios from "axios";
//Variable
import {baseURL} from "./../../variables";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1.5fr 2fr",
  },
  heading: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  title: {
    display: "block",
    fontFamily: "Product-Sans",
    fontSize: ".9rem",
  },
  quantity: {
    display: "block",
    fontFamily: "Product-Sans",
    fontSize: "3rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  statBox: {
    margin: "1.2rem 0",
  },
  rupee: {
    fontSize: "2rem",
    color: "black",
  },
}));

const BasicStats = (props) => {
  const classes = useStyle();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.post(`${baseURL}/api/v1/orders/orderStats`, {token: props.staff.token})
      .then(res => {
        setStats(res.data.data);
      }).catch(err => {
        alert(err);
        console.log(err);
      })
  }, [props.staff])

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h6" align="left" className={classes.heading}>
          Order Stats
        </Typography>

        <div className={classes.statBox}>
          <span className={classes.title}>Orders</span>
          <span className={classes.quantity}>{props.tableData.length}</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Served</span>
          <span className={classes.quantity}>{_.countBy(props.tableData, (o) => o.state === "cooked")["true"] || 0}</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Preparing</span>
          <span className={classes.quantity}>{_.countBy(props.tableData, (o) => o.state === "placed")["true"] || 0}</span>
        </div>
      </div>

      <div>
        <Typography variant="h6" align="left" className={classes.heading}>
          Today's
        </Typography>

        <div className={classes.statBox}>
          <span className={classes.title}>Best Selling Dish</span>
          <span className={classes.quantity}>{stats.bestSelling}</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Total Orders</span>
          <span className={classes.quantity}>{stats.orders}</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Total Income</span>
          <span className={classes.quantity}>
            {stats.totalIncome}<span className={classes.rupee}>₹</span>
          </span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Net Profit</span>
          <span className={classes.quantity}>
            {stats.netProfit}<span className={classes.rupee}>₹</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({staff}) => ({staff});

export default connect(mapStateToProps)(BasicStats);
