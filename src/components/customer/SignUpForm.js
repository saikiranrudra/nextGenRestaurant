import React, { useState } from "react";
import { Typography, Button, Fade } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    inputText: {
        border: "none",
        margin: ".2rem",
        padding: "0.4rem .6rem",
        borderRadius: "4px",
        backgroundColor: "#f5f5f5",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: ".6rem",
        width: "12rem",
        position: "relative",
        left: "48%",
        transform: "translateX(-50%)",
    },
    btn: {
        borderRadius: "3rem",
        padding: ".3rem 2.4rem",
        fontSize: ".9rem",
    },
});

const SignUpForm = () => {
    const classes = useStyle();
    const [data, setData] = useState({});
    return (
        <Fade in={true}>
            <div className={classes.container}>
                <Typography variant="body1" align="center">
                    Please fill your details
                </Typography>
                <input
                    type="text"
                    className={classes.inputText}
                    value={data.name}
                    onChange={(el) => {
                        setData({ ...data, name: el.target.value });
                    }}
                    placeholder="Enter your Name"
                />
                <input
                    type="email"
                    className={classes.inputText}
                    value={data.email}
                    onChange={(el) => {
                        setData({ ...data, email: el.target.value });
                    }}
                    placeholder="Enter your Email"
                />
                <input
                    type="number"
                    className={classes.inputText}
                    value={data.phoneNo}
                    onChange={(el) => {
                        setData({ ...data, phoneNo: el.target.value });
                    }}
                    placeholder="Enter your Phone Number"
                />
                <Typography
                    style={{ fontSize: ".8rem", marginTop: ".8rem" }}
                    variant="body2"
                    align="center"
                >
                    Select Date of Birth
                </Typography>
                <input
                    type="date"
                    className={classes.inputText}
                    value={data.birthDate}
                    onChange={(el) => {
                        setData({ ...data, birthDate: el.target.value });
                    }}
                />

                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: ".8rem" }}
                    className={classes.btn}
                >
                    Sign Up
                </Button>
            </div>
        </Fade>
    );
};

export default SignUpForm;
