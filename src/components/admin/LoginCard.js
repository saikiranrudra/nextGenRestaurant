import React from "react";

// components
import { Paper, Button, Typography } from "@material-ui/core";

//Routing
import { Link } from "react-router-dom";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
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
  title: {
    fontFamily: "Product-Sans",
    margin: "2rem",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1rem",
  },
  btn: {
    borderRadius: "1rem",
    margin: "1rem",
    width: "7rem",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
});

const LoginCard = (props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.container}>
      <Typography variant="h4" align="center" className={classes.title}>
        {props.name}
      </Typography>
      <input
        type="password"
        placeholder="Enter Password"
        className={classes.inputField}
      />
      <Link to={props.linkTo} className={classes.link}>
        <Button variant="contained" color="primary" className={classes.btn}>
          Login
        </Button>
      </Link>
    </Paper>
  );
};

export default LoginCard;
