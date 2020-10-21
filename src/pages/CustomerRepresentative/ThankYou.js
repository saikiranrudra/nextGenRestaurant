import React from "react";

// Components
import TopLogo from "./../../components/general/TopLogo";
import Navigation from "./../../components/customer/Navigation";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    marginTop: "5rem",
  },
  heroText: {
    color: theme.palette.primary.main,
    fontSize: "5rem",
    margin: "10rem 0 0 1rem",
    fontFamily: "Product-Sans",
  },
  subText: {
    fontFamily: "Product-Sans",
    fontSize: "1rem",
    marginLeft: "1rem",
    width: "17rem",
  },
}));

const ThankYou = () => {
  const classes = useStyle();
  return (
    <>
      <TopLogo />
      <div className={classes.container}>
        <h1 className={classes.heroText}>Thank You!</h1>
        <h5 className={classes.subText}>
          Our Customer Representative will collect your Bill
        </h5>
      </div>

      <Navigation>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link
            to="/cr/select/table"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant="contained"
              color="primary"
            >
              Select Table
            </Button>
          </Link>
          <Link
            to="/cr/home"
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

export default ThankYou;
