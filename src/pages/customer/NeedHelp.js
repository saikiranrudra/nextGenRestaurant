import React from "react";

// components
import TopLogo from "./../../components/general/TopLogo";
import Navigation from "./../../components/customer/Navigation";
import { Typography, Button } from "@material-ui/core";

//media
import care from "./../../assets/care.svg";

//styling
import { makeStyles } from "@material-ui/core/styles";

//Routing
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  img: {
    width: "6rem",
  },
  imgContainer: {
    display: "inline-block",
    backgroundColor: "#f5f5f5",
    padding: "2rem",
    borderRadius: "8rem",
  },
  container: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    top: "43%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
  },
  textMain: {
    fontFamily: "Product-Sans",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: ".8rem",
  },
  textSub: {
    fontFamily: "Product-Sans",
    fontSize: "1rem",
    padding: ".4rem 2.5rem",
  },
});

const NeedHelp = () => {
  const classes = useStyle();
  return (
    <>
      <TopLogo />
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <img src={care} alt="care" className={classes.img} />
        </div>
        <div>
          <Typography variant="h5" align="center" className={classes.textMain}>
            Breath IN, Breath Out
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className={classes.textSub}
          >
            Our Customer Representative is Coming to rescue you
          </Typography>
        </div>
      </div>
      <Navigation>
        <div style={{ textAlign: "center" }}>
          <Link
            to="/customer/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ fontFamily: "Product-Sans" }}
            >
              Go back to menu
            </Button>
          </Link>
        </div>
      </Navigation>
    </>
  );
};

export default NeedHelp;
