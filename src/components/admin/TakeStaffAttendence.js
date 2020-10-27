import React, { useEffect, useState } from "react";

//components
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttendenceCard from "./AttendenceCard";

// State Management
import { connect } from "react-redux";

// API
import axios from "axios";
//variables
import { baseURL } from "./../../variables";

// Utils
import _ from "lodash";

// assets
// icons

//styles
import { makeStyles } from "@material-ui/core/styles";

const months = {
    0: "jan",
    1: "feb",
    2: "march",
    3: "april",
    4: "may",
    5: "jun",
    6: "jul",
    7: "aug",
    8: "sept",
    9: "oct",
    10: "nov",
    11: "dec",
};

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: ".4rem",
    },
    date: {
        color: theme.palette.primary.main,
        fontFamily: "Product-Sans",
        fontSize: "1.1rem",
        fontWeight: "bold",
    },
    head: {
        display: "flex",
        margin: ".8rem",
        justifyContent: "space-between",
        alignItems: "center",
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        borderRadius: "5px",
        backgroundColor: "#fff",
        padding: ".4rem 0",
        "& > input": {
            width: "100%",
            outline: "none",
            border: "none",
            fontFamily: "Product-Sans",
            fontSize: ".9rem",
            "&::placeholder": {
                color: "#D9D9D9",
            },
        },
        "& > svg": {
            margin: "0 .8rem",
            fill: "#D9D9D9",
        },
    },
    cardList: {
        overflowX: "hidden",
        overflowY: "scroll",
        height: "75vh",
    },
}));

const TakeStaffAttendence = (props) => {
    const classes = useStyles();
    const [employeesData, setEmployeesData] = useState({ employees: [] });
    const { selectedDate, staff } = props;

    useEffect(() => {
        axios
            .post(`${baseURL}/api/v1/attendence/getAttendences`, {
                token: staff.token,
                thisDate: selectedDate.getDate(),
                month: selectedDate.getMonth(),
                year: selectedDate.getFullYear(),
            })
            .then((res) => {
                setEmployeesData(res.data.data);
                console.log("ATTENDENCE DATA: ", res.data.data);
            });
    }, [selectedDate, staff]);

    //TESTING
    useEffect(() => {
        console.log(employeesData);
    }, [employeesData]);

    const handleSaveChanges = () => {
        let data = _.clone(employeesData);
        data.thisDate = selectedDate.getDate();
        data.month = selectedDate.getMonth();
        data.year = selectedDate.getFullYear();
        data.token = staff.token;

        axios
            .post(`${baseURL}/api/v1/attendence/saveAttendences`, data)
            .then((res) => {
                props.setTakeAttendence(false);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    };

    return (
        <div className={classes.container}>
            {/* heading */}
            <div className={classes.head}>
                <div className={classes.date}>
                    {`${props.selectedDate.getDate()}-${
                        months[props.selectedDate.getMonth()]
                    }-${props.selectedDate.getFullYear()}`}
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ transform: "scale(.85)" }}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* search box */}
            <div className={classes.searchContainer}>
                <SearchIcon />
                <input type="text" placeholder="Search" />
            </div>

            {/* // staff list */}
            <div className={classes.cardList}>
                {employeesData !== undefined
                    ? employeesData.employees !== undefined
                        ? employeesData.employees.map((employee, index) => (
                              <AttendenceCard
                                  key={index}
                                  employeesData={employeesData}
                                  setEmployeesData={setEmployeesData}
                                  employee={employee}
                              />
                          ))
                        : null
                    : null}
            </div>
        </div>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps)(TakeStaffAttendence);
