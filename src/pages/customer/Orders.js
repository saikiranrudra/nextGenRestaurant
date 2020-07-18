import React, { useState, useEffect } from "react";

// components
import TopLogo from "./../../components/general/TopLogo";
import OrderList from "./../../components/customer/OrderList";
import CrossSale from "./../../components/customer/CrossSale";
import { Typography, TextField, Button } from "@material-ui/core";
import Navigation from "./../../components/customer/Navigation";
import NeedHelp from "./../../components/customer/NeedHelp";
import RecivedOrdersList from "./../../components/customer/RecivedOrdersList";

// components
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

//state management
import { connect } from "react-redux";

//routing
import { Link } from "react-router-dom";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  heading: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    marginTop: "6rem",
    marginLeft: "1rem",
  },
  subTitle: {
    fontSize: "2rem",
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    marginRight: "1rem",
  },
  subsubTitle: {
    fontFamily: "Product-Sans",
    fontSize: "1.3rem",
    marginLeft: ".8rem",
  },
  link: {
    fontFamily: "Product-Sans",
    textDecoration: "none",
    color: "inherit",
  },
  btnContainer: {
    margin: ".8rem",
    display: "flex",
    "& > a": {
      marginLeft: "auto",
    },
  },
});

const Orders = (props) => {
  const classes = useStyle();
  const [instructions, setInstructions] = useState("");
  const [count, setCount] = useState(0);
  const { menu } = props;
  useEffect(() => {
    let calcCount = 0;
    menu.forEach((item) => {
      if (item.normalCount > 0 || item.jainCount > 0) {
        calcCount++;
      }
    });
    setCount(calcCount);
  }, [menu]);

  return (
    <>
      <TopLogo />
      <Typography variant="h4" align="left" className={classes.heading}>
        Review Your order
      </Typography>
      <OrderList />
      <div style={{ margin: "1rem" }}>
        <TextField
          id="standard-basic"
          label="Add Cooking Instructions (Optional)"
          multiline
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <Typography variant="h3" align="right" className={classes.subTitle}>
        Dishes Selected {count}
      </Typography>
      <div className={classes.btnContainer}>
        <Link to="/customer/orderconfirm" className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRightIcon />}
          >
            Order Now
          </Button>
        </Link>
      </div>

      <div>
        <Typography variant="h6" align="left" className={classes.subsubTitle}>
          Your Orders
        </Typography>
        <RecivedOrdersList />
      </div>

      <Typography variant="h6" align="left" className={classes.subsubTitle}>
        Take some side dishes
      </Typography>
      <div style={{ margin: ".8rem", marginBottom: "5rem" }}>
        <CrossSale />
      </div>
      <Navigation>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <NeedHelp />
          <Link
            to="/customer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="contained" color="primary">
              Menu
            </Button>
          </Link>
        </div>
      </Navigation>
    </>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(Orders);
