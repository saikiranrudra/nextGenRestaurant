import React from "react";

// components
import SignUpForm from "./../../components/customer/SignUpForm";
import { Typography } from "@material-ui/core";
import SignUpWithGoogle from "./../../components/customer/SignUpWithGoogle";
import Navigation from "./../../components/customer/Navigation";
import NeedHelp from "./../../components/customer/NeedHelp";

// images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  logo: {
    textAlign: "center",
    marginTop: "2.8rem",
    "& > img": {
      width: "15rem",
    },
  },
  heading: {
    fontFamily: "Product-Sans",
    fontWeight: "normal",
    fontSize: "2.9rem",
    marginTop: "2.3rem",
  },
  authSection: {
    textAlign: "center",
    marginTop: "1rem",
  },
  text: {
    fontSize: ".8rem",
    fontWeight: "bold",
    marginTop: ".3rem",
  },
});

const SignUp = () => {
  const classes = useStyle();

  return (
    <>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Typography variant="h3" align="center" className={classes.heading}>
        Sign up
      </Typography>
      <div className={classes.authSection}>
        <SignUpWithGoogle />
      </div>
      <Typography variant="body1" align="center" className={classes.text}>
        Or
      </Typography>

      <div style={{ marginBottom: "6rem" }}>
        <SignUpForm />
      </div>
      <div style={{ textAlign: "center" }}>
        <Navigation>
          <NeedHelp />
        </Navigation>
      </div>
    </>
  );
};

export default SignUp;
