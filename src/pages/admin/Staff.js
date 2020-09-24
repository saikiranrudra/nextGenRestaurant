import React, { useState } from "react";

//Components
import { Paper, Button } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import StaffCalender from "./../../components/admin/StaffCalender";
import StaffDisplay from "./../../components/admin/StaffDisplay";
import StaffSpecificAttendence from "./../../components/admin/StaffSpecificAttendence";
import EditStaff from "./../../components/admin/EditStaff";
import TakeStaffAttendence from "./../../components/admin/TakeStaffAttendence";

// State Management
import { connect } from "react-redux";
//Actions
import { staffLogin } from "./../../actions/customer";

//assets
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gridTemplateRows: "58px 1fr",
        gridGap: ".5rem",
        height: "100vh",
        backgroundColor: "#fff",
    },
    subContainer: {
        display: "grid",
        gridTemplateColumns: "330px 330px 330px 330px",
        placeContent: "center",
        gridGap: "1rem",
    },
    menuContainer: {
        display: "flex",
        flexDirection: "row",
        gridRow: "span 2",
        justifyContent: "center",
    },
    logo: {
        width: "4rem",
        marginTop: "1rem",
    },
});

const Staff = (props) => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [takeAttendence, setTakeAttendence] = useState(false);
    return (
        <div className={classes.container}>
            <Paper className={classes.menuContainer}>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Nav />
                </div>
            </Paper>

            <div
                style={{
                    gridColumn: "2 / -1",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span style={{ width: "8rem", margin: "0 auto" }}></span>
                {/* <img
          src={logo}
          alt="logo"
          style={{ width: "8rem", margin: "0 auto" }}
        /> */}
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Logout style={{ width: "1rem", fill: "#fff" }} />}
                    style={{ margin: "1rem" }}
                    onClick={() => {
                        props.staffLogin(null);
                    }}
                >
                    Logout
                </Button>
            </div>

            <div className={classes.subContainer}>
                <StaffCalender
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                {takeAttendence ? (
                    <TakeStaffAttendence
                        selectedDate={selectedDate}
                        setTakeAttendence={setTakeAttendence}
                    />
                ) : (
                    <StaffDisplay
                        setTakeAttendence={setTakeAttendence}
                        selectedDate={selectedDate}
                    />
                )}
                <StaffSpecificAttendence />
                <EditStaff />
            </div>
        </div>
    );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { staffLogin })(Staff);
