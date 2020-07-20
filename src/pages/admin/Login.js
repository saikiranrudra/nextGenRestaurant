import React from "react";

// Components
import { Typography, Button } from "@material-ui/core";

//routing
import { Link } from "react-router-dom";

//images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    height: "100vh",
    placeContent: "center",
  },
  logo: {
    width: "25rem",
  },
  font: {
    fontFamily: "Product-Sans",
    margin: ".6rem",
  },
  inputField: {
    width: "12rem",
    fontFamily: "Product-Sans",
    justifySelf: "center",
    marginTop: "1rem",
    padding: ".6rem .8rem",
    borderRadius: "1rem",
    border: "none",
    outline: "none",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    fontSize: ".9rem",
  },
  btn: {
    width: "7rem",
    borderRadius: "1rem",
    justifySelf: "center",
    margin: "1rem 0",
    fontSize: ".8rem",
  },
  forgotPassword: {
    fontFamily: "Product-Sans",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const Login = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <img src={logo} alt="logo" className={classes.logo} />
      <Typography variant="h5" align="center" className={classes.font}>
        Log in
      </Typography>

      <input
        type="password"
        placeholder="Enter Password"
        className={classes.inputField}
      />
      <Link
        to="/admin/screenlogin"
        style={{
          textDecoration: "none",
          justifySelf: "center",
          color: "inherit",
        }}
      >
        <Button variant="contained" color="primary" className={classes.btn}>
          Login
        </Button>
      </Link>

      <Typography
        variant="body1"
        align="center"
        className={classes.forgotPassword}
      >
        Forgot Password ?
      </Typography>
    </div>
  );
};

export default Login;
