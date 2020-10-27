import React, { useState } from "react";

//components
import { Button, Typography } from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//Action
import { updateMenuItemFeatured } from "./../../actions/admin";
import { fetchMenuItems } from "./../../actions/customer";

// Variables
import { baseURL } from "./../../variables";

//API
import axios from "axios";

//icon
import edit from "./../..//assets/dashboardAssets/edit.svg";
import StarIcon from "@material-ui/icons/Star";

//utils
// import _ from "lodash";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "110px 1fr",
        margin: ".5rem 0",
        backgroundColor: "#fff",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
    },
    cardImg: {
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "110px",
        borderRadius: "5px",
        margin: ".3rem",
    },
    cardContent: {
        display: "grid",
        gridTemplateColumns: "1fr 80px",
        alignItems: "center",
    },
    editBtn: {
        padding: ".3rem .8rem",
        fontSize: ".8rem",
        fontWeight: "bold",
        backgroundColor: "#fff",
        margin: ".5rem 0 0 0",
    },
    cardContentText: {
        marginLeft: ".8rem",
    },
    id: {
        fontFamily: "Product-Sans",
        fontSize: ".8rem",
        marginTop: ".3rem",
    },
    name: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        marginTop: ".1rem",
    },
    category: {
        fontFamily: "Product-Sans",
        fontSize: ".8rem",
    },
    mealFor: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        marginTop: ".3rem",
    },
    itemVisibility: {
        color: theme.palette.primary.main,
        fontSize: ".8rem",
        fontWeight: "bold",
        fontFamily: "Product-Sans",
    },
    featured: {
        display: "flex",
        flexDirection: "column",
        marginTop: ".3rem",
        alignItems: "center",
        cursor: "pointer",
    },
    price: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontSize: "1.2rem",
    },
}));

const MenuItem = (props) => {
    const classes = useStyle();
    const [featured, setFeatured] = useState("Featured");

    const handleFeatured = (item, updateMenuItemFeatured) => {
        const data = {
            featured: item.featured ? false : true,
            token: props.staff.token,
            _id: item._id,
        };

        setFeatured("please wait...");
        // make api call update in database
        axios
            .put(`${baseURL}/api/v1/items/changefeatured`, data)
            .then((res) => {
                props.fetchMenuItems();
                setFeatured("Featured");
            })
            .catch((err) => {
                alert(err);
                setFeatured("Featured");
            });
    };

    return (
        <div
            className={classes.cardContainer}
            style={{ backgroundColor: !props.item.visible ? "#D9D9D9" : null }}
        >
            <div
                className={classes.cardImg}
                style={{
                    backgroundImage: `url("${baseURL}${props.item.img}")`,
                }}
            ></div>
            <div className={classes.cardContent}>
                <div className={classes.cardContentText}>
                    <Typography
                        variant="body1"
                        align="left"
                        className={classes.id}
                    >
                        {props.item._id}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="left"
                        className={classes.name}
                    >
                        {props.item.name}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="left"
                        className={classes.category}
                    >
                        {props.item.category.map((cat, index) => {
                            if (index === 0) {
                                return `${cat.name}`;
                            } else {
                                return `, ${cat.name}`;
                            }
                        })}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="left"
                        className={classes.mealFor}
                    >
                        Meal for {props.item.mealFor}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="left"
                        className={classes.itemVisibility}
                    >
                        {props.item.visible ? "On Menu" : "Not on Menu"}
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        endIcon={
                            <img
                                src={edit}
                                alt="edit"
                                style={{ width: "1rem" }}
                            />
                        }
                        className={classes.editBtn}
                        onClick={() => {
                            props.setSelectedForEdit(props.item);
                        }}
                    >
                        Edit
                    </Button>
                    <div
                        className={classes.featured}
                        onClick={() => {
                            handleFeatured(
                                props.item,
                                props.updateMenuItemFeatured
                            );
                        }}
                    >
                        <StarIcon
                            style={{
                                fill: props.item.featured
                                    ? "#FC6565"
                                    : "#989898",
                            }}
                        />
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: "0.7rem",
                                fontFamily: "Product-Sans",
                            }}
                        >
                            {featured}
                        </Typography>

                        {props.item.jainCount !== undefined ? (
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "0.8rem",
                                    fontFamily: "Product-Sans",
                                }}
                            >
                                Jain Available
                            </Typography>
                        ) : null}

                        <Typography variant="body2" className={classes.price}>
                            {props.item.price}₹
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default MenuItem;
const mapStateToProps = ({ menu, staff }) => ({ menu, staff });
export default connect(mapStateToProps, {
    updateMenuItemFeatured,
    fetchMenuItems,
})(MenuItem);
