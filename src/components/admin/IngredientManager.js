import React, { useState } from "react";

//components
import { Typography, Button, TableBody, Table } from "@material-ui/core";
import IngredientManageTab from "./IngredientManageTab";

//utils
import _ from "lodash";

//API
import axios from "axios";

//Variables
import { baseURL } from "./../../variables";

// State Mangement
import { connect } from "react-redux";
// actions
import { addNewIngredient } from "./../../actions/customer";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
    title: {
        fontFamily: "Product-Sans",
        fontSize: "1.6rem",
        fontWeight: "bold",
    },
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "1.2rem",
    },
    formContainer: {
        display: "flex",
        justifyContent: "flex-start",
    },
    name: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        padding: ".3rem .6rem",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        width: "221px",
        margin: "0 .4rem 0 0",
    },
    unit: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        outline: "none",
        borderRadius: "5px",
        border: "none",
        marginRight: ".4rem",
    },
    tableBody: {
        borderBottom: "8px solid #f5f5f5",
        borderTop: "8px solid #f5f5f5",
        // borderBottom: "5px solid #f5f5f5",
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            backgroundColor: "#fff",
        },
    },
});

const IngredientManager = (props) => {
    const classes = useStyle();
    const [ingredient, setIngredient] = useState({
        name: "",
        unit: "kg",
    });

    const [btnText, setBtnText] = useState({ add: "Add +", delete: "delete" });

    const handleIngridentAddition = () => {
        setBtnText({ ...btnText, add: "please wait..." });
        let data = _.clone(ingredient);
        data["token"] = props.staff.token;

        axios
            .post(`${baseURL}/api/v1/ingredient/createIngredient`, data)
            .then((res) => {
                props.addNewIngredient(res.data.data);
                setBtnText({ ...btnText, add: "Add +" });
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText({ ...btnText, add: "Add +" });
            });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h6" align="left" className={classes.title}>
                Add Ingredients
            </Typography>
            <div className={classes.formContainer}>
                <input
                    type="text"
                    placeholder="Name"
                    value={ingredient.name}
                    className={classes.name}
                    onChange={(e) => {
                        setIngredient({ ...ingredient, name: e.target.value });
                    }}
                />
                <select
                    value={ingredient.unit}
                    className={classes.unit}
                    onChange={(e) => {
                        setIngredient({ ...ingredient, unit: e.target.value });
                    }}
                >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="nos">nos</option>
                </select>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        btnText.add.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                    style={{ fontSize: "0.7rem", fontFamily: "Product-Sans" }}
                    onClick={handleIngridentAddition}
                >
                    {btnText.add}
                </Button>
            </div>

            <Table>
                <TableBody>
                    {/* loop */}
                    {props.ingredients.map((ingredientItem, index) => {
                        return (
                            <IngredientManageTab
                                ingredientItem={ingredientItem}
                                index={index}
                                key={index}
                            />
                        );
                    })}

                    {/* loop end */}
                </TableBody>
            </Table>
        </div>
    );
};

const mapStateToProps = ({ ingredients, staff }) => ({ ingredients, staff });

export default connect(mapStateToProps, {
    addNewIngredient,
})(IngredientManager);
