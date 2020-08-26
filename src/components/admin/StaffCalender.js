import React from "react";
import Calendar from "react-calendar";
import "./../../utils/calenderStyle.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
    const classes = useStyles();
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
                        26
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
                        2
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
                    <input type="date" />
                    <span
                        style={{
                            fontFamily: "Product-Sans",
                            margin: "0 .3rem",
                        }}
                    >
                        to
                    </span>
                    <input type="date" />

                    <button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        Go
                    </button>
                </div>
                <Typography variant="h4" align="left" className={classes.count}>
                    96%
                </Typography>
            </div>
        </div>
    );
};

export default StaffCalender;
