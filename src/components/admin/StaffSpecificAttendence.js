import React, { useState } from "react";

// Components
import { Typography } from "@material-ui/core";
import Calendar from "react-calendar";

// assets
import staffAvator from "./../../assets/staffAvator.png";

//styles
import { makeStyles } from "@material-ui/core/styles";

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
        backgroundImage: `url(${staffAvator})`,
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
const StaffSpecificAttendenc = (props) => {
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.avator}></div>
                <div className={classes.content}>
                    <div className={classes.name} align="left">
                        {props.selectedStaff.name}
                    </div>
                    <div className={classes.designation} align="left">
                        {props.selectedStaff.designation}
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
                        26
                    </Typography>
                </div>
                {/* <div style={{ justifySelf: "end" }}>
          <Typography variant="h4" align="left" className={classes.subtitle}>
            Absent Staff
          </Typography>
          <Typography variant="h4" align="left" className={classes.count}>
            2
          </Typography>
        </div> */}
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

export default StaffSpecificAttendenc;
