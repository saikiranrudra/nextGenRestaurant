import React, { useState } from "react";

//components

//State Management
import { connect } from "react-redux";

//Variables
import { baseURL } from "./../../variables";

//Utils
import _ from "lodash";

//styles
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles({
    card: {
        display: "grid",
        gridTemplateColumns: "65px 1fr 86px",
        padding: ".7rem",
        alignContent: "center",
        backgroundColor: "#fff",
        margin: "1rem 0",
    },

    avator: {
        display: "inline-block",
        height: "65px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        borderRadius: "5rem",
    },
    content: {
        paddingLeft: ".3rem",
        marginTop: ".4rem",
    },
    name: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontSize: "1.1rem",
    },
    designation: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
    },
    cardList: {
        overflowX: "hidden",
        overflowY: "scroll",
        height: "75vh",
    },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    btn: {
        borderRadius: "1rem",
        height: "1rem",
        width: "1rem",
    },
    btnRing: {
        border: "2px solid #FC6565",
        cursor: "pointer",
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "1.7rem",
        height: "1.7rem",
        backgroundColor: "transparent",
    },
    btnText: {
        fontFamily: "Product-Sans",
        fontSize: ".8rem",
        fontWeight: "bold",
    },
});

const Attendencecard = (props) => {
    const classes = useStyles();
    const [absent, setAbsent] = useState(props.employee.isAbsent);
    return (
        <>
            <div className={classes.card}>
                <div
                    className={classes.avator}
                    style={{
                        backgroundImage: `url(${baseURL}${props.employee.employeeId.img})`,
                    }}
                ></div>
                <div className={classes.content}>
                    <div className={classes.name} align="left">
                        {props.employee.employeeId.name}
                    </div>
                    <div className={classes.designation} align="left">
                        {props.employee.employeeId.designation}
                    </div>
                </div>
                <div className={classes.btnContainer}>
                    <div className={classes.btnRing}>
                        <div
                            className={classes.btn}
                            onClick={() => {
                                let newEmployees = _.clone(
                                    props.employeesData.employees
                                );
                                let index = _.findIndex(
                                    newEmployees,
                                    (o) => o._id === props.employee._id
                                );

                                if (absent === false) {
                                    setAbsent(true);

                                    if (index !== -1) {
                                        newEmployees[index].isAbsent = true;
                                    }
                                } else {
                                    setAbsent(false);
                                    if (index !== -1) {
                                        newEmployees[index].isAbsent = false;
                                    }
                                }
                                props.setEmployeesData({
                                    ...props.employeesData,
                                    employees: newEmployees,
                                });
                            }}
                            style={{
                                backgroundColor:
                                    absent === false
                                        ? "transparent"
                                        : props.app.themeColor,
                            }}
                        ></div>
                    </div>
                    <Typography
                        variant="h6"
                        color="primary"
                        className={classes.btnText}
                    >
                        Absent
                    </Typography>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(Attendencecard);
