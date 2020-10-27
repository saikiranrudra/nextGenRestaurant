import React, { useState, useEffect } from "react";

//Components
import Calendar from "react-calendar";
import "./../../utils/calenderStyle.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

//State Management
import { connect } from "react-redux";

//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//utils
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#f5f5f5",
        padding: "1rem 1rem",
        borderRadius: "10px",
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

const StaffCalender = (props) => {
    const [stats, setStats] = useState({ presentStaff: 0, absentStaff: 0 });
    const [averagePresent, setAveragePresent] = useState(0);
    const [btnText, setBtnText] = useState("Go");
    const [dateRange, setDateRange] = useState({
        startDate: new Date(
            new Date().getDate(),
            new Date().getMonth() - 1,
            new Date().getFullYear()
        ),
        endDate: new Date(),
    });
    const classes = useStyles();
    const { selectedDate, staff } = props;
    useEffect(() => {
        axios
            .post(`${baseURL}/api/v1/attendence/getAttendences`, {
                thisDate: selectedDate.getDate(),
                month: selectedDate.getMonth(),
                year: selectedDate.getFullYear(),
                token: staff.token,
            })
            .then((res) => {
                let data = _.clone(res.data.data);
                let presentStaff = 0;
                let absentStaff = 0;

                data.employees.forEach((employee) => {
                    if (employee.isAbsent === true) {
                        ++absentStaff;
                    } else {
                        ++presentStaff;
                    }
                });

                setStats({
                    presentStaff: presentStaff,
                    absentStaff: absentStaff,
                });
            });
    }, [selectedDate, staff]);

    useEffect(() => {
        let data = { ...dateRange, token: staff.token };
        axios
            .post(`${baseURL}/api/v1/attendence/averagePresent`, data)
            .then((res) => {
                setAveragePresent(res.data.data);
            });
    });

    const handleGo = () => {
        const data = { ...dateRange, token: staff.token };
        setBtnText("please wait ...");
        axios
            .post(`${baseURL}/api/v1/attendence/averagePresent`, data)
            .then((res) => {
                setAveragePresent(res.data.data);
                setBtnText("Go");
            })
            .catch((err) => {
                setBtnText("Go");
            });
    };

    return (
        <div className={classes.container}>
            <Calendar
                onChange={(data) => props.setSelectedDate(data)}
                value={props.selectedDate}
            />

            <div className={classes.attendenceCount}>
                <div style={{ borderRight: "1px solid #989898" }}>
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
                        {stats.presentStaff}
                    </Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.subtitle}
                    >
                        Absent Staff
                    </Typography>
                    <Typography
                        variant="h4"
                        align="left"
                        className={classes.count}
                    >
                        {stats.absentStaff}
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
                        justifyContent: "center",
                        alignItems: "center",
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
                        onChange={(e) =>
                            setDateRange({
                                ...dateRange,
                                endDate: e.target.value,
                            })
                        }
                    />

                    <button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={handleGo}
                        disabled={
                            btnText.toLowerCase().includes("please wait")
                                ? true
                                : false
                        }
                    >
                        {btnText}
                    </button>
                </div>
                <Typography variant="h4" align="left" className={classes.count}>
                    {averagePresent}%
                </Typography>
            </div>
        </div>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });

export default connect(mapStateToProps)(StaffCalender);
