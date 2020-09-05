import React, { useState } from "react";

//components
import { Button, Dialog, DialogTitle } from "@material-ui/core";
import Radio from "./../general/Radio";
import Switch from "./../general/Switch";

// State Management
import { connect } from "react-redux";
//actions
import { setPrimaryColor } from "./../../actions/general/theme";
import { setAppState } from "./../../actions/general/appState";

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

    const handleDialogClose = () => {
        setDialog(false);
    };

    const handleColorChange = (color) => {
        props.setPrimaryColor(color);
    };

    const handleAppStateChange = () => {
        setTimeout(() => {
            if (props.appState === "online") {
                props.setAppState("offline");
            } else {
                props.setAppState("online");
            }
        }, 2000);
    };

    return (
        <>
            <div className={classes.settingsForm}>
                <label htmlFor="nameOfRestaurant">Name of Restaurant</label>
                <input
                    id="nameOfRestaurant"
                    type="text"
                    placeholder="Name"
                    style={{
                        padding: ".6rem .8rem",
                        width: "100%",
                    }}
                />

                <label>Logo of Restaurant</label>
                <p>Upload High Quality png File for Image</p>
                <input id="logoOfRestaurnat" type="file" accept=".png" />
                <label htmlFor="logoOfRestaurnat" className={classes.uploadBtn}>
                    Upload
                </label>

                <label style={{ marginTop: "1rem" }}>
                    Change Theme color of System
                </label>

                <div className={classes.colorContainer}>
                    <Radio
                        color="#FC6565"
                        active={"#FC6565" === props.theme.primary}
                        onClick={() => handleColorChange("#FC6565")}
                    />
                    <Radio
                        color="#FF8D4E"
                        active={"#FF8D4E" === props.theme.primary}
                        onClick={() => handleColorChange("#FF8D4E")}
                    />
                    <Radio
                        color="#D0FD4F"
                        active={"#D0FD4F" === props.theme.primary}
                        onClick={() => handleColorChange("#D0FD4F")}
                    />
                    <Radio
                        color="#79E08F"
                        active={"#79E08F" === props.theme.primary}
                        onClick={() => handleColorChange("#79E08F")}
                    />
                    <Radio
                        color="#9BD6DA"
                        active={"#9BD6DA" === props.theme.primary}
                        onClick={() => handleColorChange("#9BD6DA")}
                    />
                    <Radio
                        color="#7471FC"
                        active={"#7471FC" === props.theme.primary}
                        onClick={() => handleColorChange("#7471FC")}
                    />
                    <Radio
                        color="#EE8DFE"
                        active={"#EE8DFE" === props.theme.primary}
                        onClick={() => handleColorChange("#EE8DFE")}
                    />
                    <Radio
                        color="#FF75A7"
                        active={"#FF75A7" === props.theme.primary}
                        onClick={() => handleColorChange("#FF75A7")}
                    />
                </div>

                <label style={{ marginTop: "1rem" }}>
                    Change system Status
                </label>
                <Switch
                    textOne="online"
                    textTwo="offline"
                    state={props.appState}
                    onClick={handleAppStateChange}
                />

                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "1rem 0" }}
                >
                    Save
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
                        <input type="text" />

                        <label>New Account Password</label>
                        <input type="password" />

                        <label>Confirm New Account Password</label>
                        <input type="password" />

                        <Button variant="contained" color="primary">
                            Change
                        </Button>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

const mapStateToProps = ({ theme, appState }) => ({ theme, appState });

export default connect(mapStateToProps, { setPrimaryColor, setAppState })(
    SettingsForm
);
