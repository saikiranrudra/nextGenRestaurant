import React from "react";

//Components
import { Paper, Button } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";
import IngredientMenu from "./../../components/admin/IngredientMenu";

import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gridTemplateRows: "58px 1fr",
        height: "100vh",
    },
    contentContainer: {
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "1.2rem",
    },
    logo: {
        width: "4rem",
        marginTop: "1rem",
    },
    menuContainer: {
        display: "flex",
        flexDirection: "row",
        gridRow: "span 2",
        justifyContent: "center",
    },
    subContainer: {
        display: "grid",
        gridGap: "1rem",
        gridTemplateColumns: "repeat(3, 430px)",
    },
});

const Inventory = () => {
    const classes = useStyle();
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
                >
                    Logout
                </Button>
            </div>

            <div className={classes.subContainer}>
                <IngredientMenu />
                <div className={classes.contentContainer}></div>
                <div className={classes.contentContainer}></div>
            </div>
        </div>
    );
};

export default Inventory;
