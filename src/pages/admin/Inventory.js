import React, { useState, useEffect } from "react";

//Components
import { Paper, Button } from "@material-ui/core";
import Nav from "./../../components/admin/Nav";
import { ReactComponent as Logout } from "./../../assets/dashboardAssets/logout.svg";
import IngredientMenu from "./../../components/admin/IngredientMenu";
import DishIngredient from "./../../components/admin/DishIngredient";
import IngredientManager from "./../../components/admin/IngredientManager";

//State Management
import { connect } from "react-redux";
//actions
import { fetchIngredients, staffLogin } from "./../../actions/customer";

import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gridTemplateRows: "58px 1fr",
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

const Inventory = (props) => {
    const classes = useStyle();
    const [selectedItem, setSelectedItem] = useState({});

    const { fetchIngredients, menu } = props;

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    useEffect(() => {
        if (menu.length > 0) {
            setSelectedItem(menu[0]);
        }
    }, [menu]);

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
                <IngredientMenu setSelectedItem={setSelectedItem} />
                <DishIngredient item={selectedItem} />
                <IngredientManager />
            </div>
        </div>
    );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps, { fetchIngredients, staffLogin })(
    Inventory
);
