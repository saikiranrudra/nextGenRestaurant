import React, { useState } from "react";

//components
import { Button, Dialog, DialogTitle } from "@material-ui/core";
import Radio from "./../general/Radio";
import Switch from "./../general/Switch";

// State Management
import { connect } from "react-redux";
//actions
// import { setPrimaryColor } from "./../../actions/general/theme";
// import { setAppState } from "./../../actions/general/appState";
import { updateAppData } from "./../../actions/general/app";

//utils
import FormData from "form-data";

//API
import axios from "axios";
//variables
import { baseURL } from "./../../variables";

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    settingsForm: {
        "& > label": {
            display: "block",
            fontFamily: "Product-Sans",
            fontWeight: "bold",
        },

        "& > input": {
            fontFamily: "Product-Sans",
            marginBottom: "1.5rem",
            marginTop: ".3rem",
            fontSize: ".9rem",
            border: "1px solid #D9D9D9",
            borderRadius: "5px",
            "&::placeholder": {
                color: "#D9D9D9",
            },
        },

        '& > input[type="file"]': {
            display: "none",
        },

        "& > p": {
            margin: ".2rem 0",
            fontFamily: "Product-Sans",
            color: "#989898",
            fontSize: ".7rem",
        },
    },
    uploadBtn: {
        display: "inline-block !important",
        borderRadius: "1rem",
        padding: ".4rem .8rem",
        fontSize: ".8rem",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        cursor: "pointer",
    },
    colorContainer: {
        display: "flex",
        marginTop: ".4rem",
        justifyContent: "space-between",
        width: "21rem",
    },

    changePasswordForm: {
        padding: ".8rem",
        display: "grid",
        placeContent: "center",
        "& > label": {
            fontFamily: "Product-Sans",
            display: "block",
            fontSize: ".9rem",
            fontWeight: "bold",
            marginBottom: ".4rem",
        },
        "& > input": {
            fontFamily: "Product-Sans",
            display: "block",
            fontSize: ".9rem",
            fontWeight: "normal",
            marginBottom: "1rem",
            padding: ".3rem",
        },
    },
}));

const SettingsForm = (props) => {
    const classes = useStyles();
    const [dialog, setDialog] = useState(false);
    const file = React.createRef();
    const [btnText, setBtnText] = useState("Save");
    const [changeBtnText, setChangeBtnText] = useState("Change");
    const [resetPassword, setResetPassword] = useState({
        password: "",
        oldPassword: "",
        confirmPassword: "",
    });

    const handleChangePassword = () => {
        setChangeBtnText("please wait...");
        if (resetPassword.password !== resetPassword.confirmPassword) {
            alert("password and confirm password is not same");
            setChangeBtnText("change");
            return;
        }
        axios
            .post(`${baseURL}/api/v1/staff/adminPasswordChange`, resetPassword)
            .then((res) => {
                alert("password changed successfully");
                setChangeBtnText("change");
            })
            .catch((err) => {
                setChangeBtnText("change");
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert(err);
                }
            });
    };

    const handleSaveChanges = () => {
        setBtnText("please wait...");
        let data = new FormData();

        data.append("token", props.staff.token);
        data.append("name", props.app.name);
        data.append("themeColor", props.app.themeColor);
        data.append("state", props.app.state);

        if (file.current.files.length > 0) {
            data.append("img", file.current.files[0]);
            
        } else {
            data.append("img", props.app.img);
        }

        axios
            .post(`${baseURL}/api/v1/restaurant/updateRestaurant`, data)
            .then((res) => {
                setBtnText("Save");
                props.updateAppData(res.data.data);

            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText("Save");
            });

            file.current.value = "";

    };

    const handleDialogClose = () => {
        setDialog(false);
    };

    const handleColorChange = (color) => {
        // props.setPrimaryColor(color);
        props.updateAppData({ ...props.app, themeColor: color });
    };

    const handleAppStateChange = () => {
        // setTimeout(() => {
        //     if (props.appState === "online") {
        //         props.setAppState("offline");
        //     } else {
        //         props.setAppState("online");
        //     }
        // }, 2000);
        if (props.app.state === "online") {
            props.updateAppData({ ...props.app, state: "offline" });
        } else {
            props.updateAppData({ ...props.app, state: "online" });
        }
    };

    const handleNameChange = (event) => {
        props.updateAppData({ ...props.app, name: event.target.value });
    };

    return (
        <>
            <div className={classes.settingsForm}>
                <label htmlFor="nameOfRestaurant">Name of Restaurant</label>
                <input
                    id="nameOfRestaurant"
                    type="text"
                    placeholder="Name"
                    value={props.app.name ? props.app.name : ""}
                    onChange={handleNameChange}
                    style={{
                        padding: ".6rem .8rem",
                        width: "21rem",
                    }}
                />

                <label>Logo of Restaurant</label>
                <p>Upload High Quality png File for Image</p>
                <input
                    id="logoOfRestaurnat"
                    type="file"
                    // value={file}
                    ref={file}
                    // onChange={(e) => {
                    //     setFile(e.target.files);
                    // }}
                    accept=".png"
                />
                <label htmlFor="logoOfRestaurnat" className={classes.uploadBtn}>
                    Upload
                </label>
  
                <label style={{ marginTop: "1rem" }}>
                    Change Theme color of System
                </label>

                <div className={classes.colorContainer}>
                    <Radio
                        color="#FC6565"
                        active={"#FC6565" === props.app.themeColor}
                        onClick={() => handleColorChange("#FC6565")}
                    />
                    <Radio
                        color="#FF8D4E"
                        active={"#FF8D4E" === props.app.themeColor}
                        onClick={() => handleColorChange("#FF8D4E")}
                    />
                    <Radio
                        color="#D0FD4F"
                        active={"#D0FD4F" === props.app.themeColor}
                        onClick={() => handleColorChange("#D0FD4F")}
                    />
                    <Radio
                        color="#79E08F"
                        active={"#79E08F" === props.app.themeColor}
                        onClick={() => handleColorChange("#79E08F")}
                    />
                    <Radio
                        color="#9BD6DA"
                        active={"#9BD6DA" === props.app.themeColor}
                        onClick={() => handleColorChange("#9BD6DA")}
                    />
                    <Radio
                        color="#7471FC"
                        active={"#7471FC" === props.app.themeColor}
                        onClick={() => handleColorChange("#7471FC")}
                    />
                    <Radio
                        color="#EE8DFE"
                        active={"#EE8DFE" === props.app.themeColor}
                        onClick={() => handleColorChange("#EE8DFE")}
                    />
                    <Radio
                        color="#FF75A7"
                        active={"#FF75A7" === props.app.themeColor}
                        onClick={() => handleColorChange("#FF75A7")}
                    />
                </div>

                <label style={{ marginTop: "1rem" }}>
                    Change system Status
                </label>
                <Switch
                    textOne="online"
                    textTwo="offline"
                    state={props.app.state}
                    onClick={handleAppStateChange}
                />

                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "1rem 0" }}
                    onClick={handleSaveChanges}
                    disabled={
                        btnText.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText}
                </Button>

                <label style={{ marginTop: "1rem 0" }}>
                    Change Account Password
                </label>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "1rem 0" }}
                    onClick={() => {
                        setDialog(true);
                    }}
                >
                    Change
                </Button>

                <Dialog onClose={handleDialogClose} open={dialog}>
                    <DialogTitle>Change Account Password</DialogTitle>
                    <div className={classes.changePasswordForm}>
                        <label>Old Account Password</label>
                        <input
                            type="text"
                            value={resetPassword.oldPassword}
                            onChange={(e) => {
                                setResetPassword({
                                    ...resetPassword,
                                    oldPassword: e.target.value,
                                });
                            }}
                        />

                        <label>New Account Password</label>
                        <input
                            type="password"
                            value={resetPassword.password}
                            onChange={(e) => {
                                setResetPassword({
                                    ...resetPassword,
                                    password: e.target.value,
                                });
                            }}
                        />

                        <label>Confirm New Account Password</label>
                        <input
                            type="password"
                            value={resetPassword.confirmPassword}
                            onChange={(e) => {
                                setResetPassword({
                                    ...resetPassword,
                                    confirmPassword: e.target.value,
                                });
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleChangePassword}
                            disabled={
                                changeBtnText
                                    .toLowerCase()
                                    .includes("please wait")
                                    ? true
                                    : false
                            }
                        >
                            {changeBtnText}
                        </Button>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

const mapStateToProps = ({ app, staff }) => ({ app, staff });

export default connect(mapStateToProps, { updateAppData })(SettingsForm);
