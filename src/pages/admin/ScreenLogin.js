import React from "react";

//components
import { Typography } from "@material-ui/core";
import LoginCard from "./../../components/admin/LoginCard";

//img
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  logo: {
    width: "13rem",
    marginTop: "3rem",
    marginBottom: "2rem",
  },
  container: {
    textAlign: "center",
  },
  loginTxt: {
    fontFamily: "Product-Sans",
    fontSize: "2rem",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 282px)",
    gridGap: "1rem",
    placeContent: "center",
    marginTop: "2rem",
  },
});

const ScreenLogin = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.container}>
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography variant="h5" align="center" className={classes.loginTxt}>
          Log in
        </Typography>
      </div>
      <div className={classes.cardContainer}>
        <LoginCard name="Kitchen" linkTo="/kitchen/dashboard" />
        <LoginCard name="Admin" linkTo="/admin/dashboard" />
        <LoginCard name="Reception" linkTo="#" />
        <LoginCard name="C.R." linkTo="/cr/select/table" />
      </div>
    </>
  );
};

export default ScreenLogin;
