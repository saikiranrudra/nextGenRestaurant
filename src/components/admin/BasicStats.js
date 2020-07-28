import React from "react";

//components
import { Typography } from "@material-ui/core";

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

const BasicStats = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
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

      <div>
        <Typography variant="h6" align="left" className={classes.heading}>
          Today's
        </Typography>

        <div className={classes.statBox}>
          <span className={classes.title}>Best Selling Dish</span>
          <span className={classes.quantity}>Ratatouille</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Total Orders</span>
          <span className={classes.quantity}>76</span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Total Income</span>
          <span className={classes.quantity}>
            20,568<span className={classes.rupee}>₹</span>
          </span>
        </div>

        <div className={classes.statBox}>
          <span className={classes.title}>Net Profit</span>
          <span className={classes.quantity}>
            8256<span className={classes.rupee}>₹</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicStats;
