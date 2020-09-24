import React, { useState } from "react";

// Components
import { Typography, Button } from "@material-ui/core";

//routing
import { useHistory } from "react-router-dom";

//Variables
import { baseURL } from "./../../variables";

// state Management
import { connect } from "react-redux";
//Actions
import { staffLogin } from "./../../actions/customer";

// API
import axios from "axios";

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

const Login = (props) => {
    const classes = useStyle();
    const [password, setPassword] = useState("");
    const [btnText, setBtnText] = useState("Login");
    const history = useHistory();

    const handleLogin = () => {
        setBtnText("please wait...");
        axios
            .post(`${baseURL}/api/v1/staff/login`, {
                role: "admin",
                password: password,
            })
            .then((res) => {
                props.staffLogin({ token: res.data.data.token });
                setBtnText("Login");
                history.push("/admin/dashboard");
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setBtnText("Login");
            });
    };

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
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            {/* <Link
                to="/admin/screenlogin"
                style={{
                    textDecoration: "none",
                    justifySelf: "center",
                    color: "inherit",
                }}
            > */}
            <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={
                    btnText.toLowerCase().includes("please wait") ? true : false
                }
                onClick={handleLogin}
            >
                {btnText}
            </Button>
            {/* </Link> */}

            {/* <Typography
        variant="body1"
        align="center"
        className={classes.forgotPassword}
      >
        Forgot Password ?
      </Typography> */}
        </div>
    );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { staffLogin })(Login);
