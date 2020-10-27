import React, {useState} from "react";

// components
import { Paper, Button, Typography } from "@material-ui/core";

//State Management
import {connect} from "react-redux";
//Action
import {staffLogin} from "./../../actions/customer";

//Routing
import { useHistory } from "react-router-dom";

//API
import axios from "axios";
//Variables
import {baseURL} from "./../../variables";

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
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    let role;
    switch(props.name) {
      case "Kitchen":
        role = "kitchen";
        break;
      default:
        role = "admin"
    }

    axios.post(`${baseURL}/api/v1/staff/login`, { role, password })
      .then(res => {
        props.staffLogin({ token: res.data.data.token, role: role })
        history.push(props.linkTo);
      })
      .catch(err => {
        alert(err);
        console.log(err);
      })

  }

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" align="center" className={classes.title}>
        {props.name}
      </Typography>

      <input
        type="password"
        placeholder="Enter Password"
        className={classes.inputField}
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
      />
      
      <Button 
          variant="contained" 
          color="primary" 
          className={classes.btn}
          onClick={handleLogin}
        >
          Login
        </Button>
    
    </Paper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { staffLogin })(LoginCard);
