import React from "react";

//components
import TopLogo from "./../../components/general/TopLogo";
import { Typography, Button } from "@material-ui/core";
import Navigation from "./../../components/customer/Navigation";
import NeedHelp from "./../../components/customer/NeedHelp";

// images
import cover from "./../../assets/cover.jpg";
import tick from "./../../assets/tick.svg";

//routing
import { Link } from "react-router-dom";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "inline-block",
    width: "100%",
    height: "100vh",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  blackCover: {
    backgroundColor: "rgb(0,0,0, 0.68)",
    display: "inline-block",
    width: "100%",
    height: "100%",
  },
  content: {
    position: "relative",
    top: "50%",
    transform: "translateY(-73%)",
    color: "#fff",
    fontSize: ".8rem",
    textAlign: "center",
    "& > img": {
      width: "6rem",
      marginBottom: "1.3rem",
    },
    "& > h3": {
      fontFamily: "Product-Sans",
      fontSize: "1.8rem",
    },
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});
const OrderConfirm = () => {
  const classes = useStyle();
  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url("${cover}")` }}
    >
      <TopLogo />
      <div className={classes.blackCover}>
        <div className={classes.content}>
          <img src={tick} alt="tick" />
          <Typography variant="h3" align="center">
            Stay Hungry! Your Order is Cooking
          </Typography>
        </div>
        <Navigation>
          <div className={classes.navContainer}>
            <NeedHelp />
            <Link
              to="/customer/home"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button variant="contained" color="primary">
                Menu
              </Button>
            </Link>
          </div>
        </Navigation>
      </div>
    </div>
  );
};
export default OrderConfirm;
