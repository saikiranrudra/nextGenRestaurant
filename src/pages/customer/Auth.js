import React, { useState } from "react";

// images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Typography, Button } from "@material-ui/core";
import LoginWithGoogle from "./../../components/customer/LoginWIthGoogle";
import InputText from "./../../components/general/InputText";

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
  subHeading: {
    fontSize: ".8rem",
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
  container: {
    marginTop: ".3rem",
    textAlign: "center",
  },
  btn: {
    borderRadius: "3rem",
    padding: ".3rem 2.4rem",
    fontSize: ".9rem",
  },
});

const Auth = () => {
  const classes = useStyle();
  const [email, setEmail] = useState("");

  return (
    <>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div>
        <Typography variant="h3" align="center" className={classes.heading}>
          Welcome!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.subHeading}
        >
          Please Login for your order
        </Typography>
      </div>

      <div className={classes.authSection}>
        <LoginWithGoogle />
      </div>

      <Typography variant="body1" align="center" className={classes.text}>
        Or
      </Typography>

      <div className={classes.container}>
        <InputText
          placeholder="Enter your email"
          text={email}
          setText={setEmail}
          type="email"
        />
      </div>
      <div style={{ marginTop: ".6rem" }} className={classes.container}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Login
        </Button>
      </div>

      <div style={{ margin: "2rem 0 " }} className={classes.container}>
        <Typography variant="body2">New Here?</Typography>
        <Button
          size="large"
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
};

export default Auth;
