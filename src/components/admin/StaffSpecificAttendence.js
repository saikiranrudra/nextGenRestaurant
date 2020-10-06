import React, { useState, useEffect } from "react";

// Components
import { Typography } from "@material-ui/core";
import Calendar from "react-calendar";

//Variables
import { baseURL } from "./../../variables";

// assets
import staffAvator from "./../../assets/staffAvator.png";

//API
import { connect } from "react-redux";

//styles
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "0 .8rem",
        overflowX: "hidden",
        overflowY: "scroll",
        height: "41rem",
    },
    card: {
        display: "grid",
        gridTemplateColumns: "65px 1fr 86px",
        padding: ".7rem",
        alignContent: "center",
        backgroundColor: "transparent",
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
    attendenceCount: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    subtitle: {
        fontFamily: "Product-Sans",
        fontSize: "1.3rem",
        fontWeight: "bold",
    },
    count: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontSize: "4rem",
        color: theme.palette.primary.main,
    },
    btn: {
        margin: ".1rem",
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        outline: "none",
        border: "none",
        padding: ".3rem .4rem",
        borderRadius: ".3rem",
        cursor: "pointer",
    },
}));
const StaffSpecificAttendence = (props) => {
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [averagePresent, setAveragePresent] = useState(0);
    const [isAbsent, setIsAbsent] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: Date.now(),
        endDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ),
    });
    const [
        presentAverageStaffSpecific,
        setPresentAverageStaffSpecific,
    ] = useState(0);

    const { selectedStaffForView, staff } = props;

    useEffect(() => {
        if (selectedStaffForView !== null && staff !== null) {
            axios
                .post(
                    `${baseURL}/api/v1/attendence/employeeAveragePresentByMonth`,
                    {
                        token: staff.token,
                        month: date.getMonth(),
                        employeeId: selectedStaffForView._id,
                    }
                )
                .then((res) => {
                    setAveragePresent(res.data.data);
                });
        }
    }, [date, selectedStaffForView, staff]);

    useEffect(() => {
        if (staff !== null && selectedStaffForView !== null) {
            axios
                .post(`${baseURL}/api/v1/attendence/employeeIsPresentByDate`, {
                    token: staff.token,
                    date: date,
                    employeeId: selectedStaffForView._id,
                })
                .then((res) => {
                    setIsAbsent(res.data.data);
                });
        }
    }, [date, staff, selectedStaffForView]);

    const getAveragePresentStaffSpecific = () => {
        if (staff !== null && selectedStaffForView !== null) {
            axios
                .post(
                    `${baseURL}/api/v1/attendence/staffSpecificAverageAttendence`,
                    {
                        token: staff.token,
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        employeeId: selectedStaffForView._id,
                    }
                )
                .then((res) => {
                    setPresentAverageStaffSpecific(res.data.data);
                });
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div
                    className={classes.avator}
                    style={{
                        backgroundImage:
                            props.selectedStaffForView !== null
                                ? `url(${baseURL}${props.selectedStaffForView.img})`
                                : `url(${staffAvator})`,
                    }}
                ></div>
                <div className={classes.content}>
                    <div className={classes.name} align="left">
                        {props.selectedStaffForView !== null
                            ? props.selectedStaffForView.name
                            : "Null"}
                    </div>
                    <div className={classes.designation} align="left">
                        {props.selectedStaffForView !== null
                            ? props.selectedStaffForView.designation
                            : "Null"}
                    </div>
                </div>
            </div>

            <Calendar
                onChange={(newDate) => setDate(newDate)}
                value={date}
                style={{ margin: 0 }}
            />

            <div className={classes.attendenceCount}>
                <div>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.subtitle}
                    >
                        Present Staff
                    </Typography>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.count}
                    >
                        {averagePresent}%
                    </Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.subtitle}
                    >
                        Is Absent
                    </Typography>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.count}
                    >
                        {isAbsent ? "Yes" : "No"}
                    </Typography>
                </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
                <Typography
                    variant="h4"
                    align="left"
                    className={classes.subtitle}
                    style={{ marginBottom: ".5rem" }}
                >
                    Average Presence
                </Typography>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) =>
                            setDateRange({
                                ...dateRange,
                                startDate: e.target.value,
                            })
                        }
                    />
                    <span
                        style={{
                            fontFamily: "Product-Sans",
                            margin: "0 .3rem",
                        }}
                    >
                        to
                    </span>
                    <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => {
                            setDateRange({
                                ...dateRange,
                                endDate: e.target.value,
                            });
                        }}
                    />

                    <button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={getAveragePresentStaffSpecific}
                    >
                        Go
                    </button>
                </div>
                <Typography variant="h4" align="left" className={classes.count}>
                    {presentAverageStaffSpecific}%
                </Typography>
            </div>
        </div>
    );
};
const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps)(StaffSpecificAttendence);
