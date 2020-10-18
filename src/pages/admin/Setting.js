import React from "react";

//Components
import { Paper, Button } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import SettingsForm from "./../../components/admin/SettingsForm";
import TablesManager from "./../../components/admin/TablesManager";

// State Management
import { connect } from "react-redux";
//Actions
import { staffLogin } from "./../../actions/customer";

//Variables
import {baseURL} from "./../../variables";

//assets
import logo from "./../../assets/logo.png";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gridGap: ".5rem",
        gridTemplateRows: "58px 1fr",
        height: "100vh",
        backgroundColor: "#fff",
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

    subContainer: {
        display: "grid",
        gridGap: "1rem",
        gridTemplateColumns: "repeat(2, 450px)",
    },
});

const Setting = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper className={classes.menuContainer}>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img
                        src={props.app.img !== undefined ? `${baseURL}${props.app.img}`: logo}
                        alt="logo"
                        className={classes.logo}
                    />
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
                <SettingsForm />

                <TablesManager />
            </div>
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps, { staffLogin })(Setting);
