import React from "react";

//Components
import { Typography, Button } from "@material-ui/core";

//assets
import SearchIcon from "@material-ui/icons/Search";
import edit from "./../..//assets/dashboardAssets/edit.svg";

// state management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    contentContainer: {
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "1.2rem",
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
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "135px 1fr 70px",
        gridGap: ".4rem",
        backgroundColor: "#fff",
        padding: ".4rem",
        margin: ".6rem 0",
        borderRadius: "5px",
    },
    cardImg: {
        height: "123px",
        borderRadius: "3px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
    id: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        margin: ".3rem 0 .5rem 0",
    },
    name: {
        fontFamily: "Product-Sans",
        fontSize: "1.2rem",
        fontWeight: "bold",
        lineHeight: "1.2rem",
    },
    ingredient: {
        fontFamily: "Product-Sans",
        color: "#848484",
        fontSize: ".8rem",
    },
});

const IngredientMenu = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.contentContainer}>
            <div className={classes.searchContainer}>
                <SearchIcon />
                <input type="text" placeholder="Search" />
            </div>
            <div>
                {props.menu.map((item, index) => (
                    <div key={index} className={classes.cardContainer}>
                        <div
                            className={classes.cardImg}
                            style={{ backgroundImage: `url("${item.img}")` }}
                        ></div>
                        <div>
                            <Typography
                                variant="body1"
                                align="left"
                                className={classes.id}
                            >
                                {item.id}
                            </Typography>
                            <Typography
                                variant="h6"
                                align="left"
                                className={classes.name}
                            >
                                {item.name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                align="left"
                                className={classes.ingredient}
                            >
                                {item.ingredients.length} Ingredients
                            </Typography>
                        </div>
                        <div
                            style={{
                                justifySelf: "center",
                                alignSelf: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={
                                    <img
                                        src={edit}
                                        alt="edit"
                                        style={{ width: "1rem" }}
                                    />
                                }
                                style={{
                                    backgroundColor: "#fff",
                                    fontSize: ".7rem",
                                    padding: ".3rem",
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(IngredientMenu);
