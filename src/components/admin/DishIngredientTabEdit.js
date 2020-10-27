import React, { useState, useEffect } from "react";
import _ from "lodash";

//components
import { Button, Typography, TableRow, TableCell } from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//action
import { editIngridentInMenu } from "./../../actions/customer";

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        fontFamily: "Product-Sans",
        fontSize: "1.2rem",
    },
    btnContainer: {
        display: "flex",
        justifyContent: "flex-end",
        "& > button": {
            fontFamily: "Product-Sans",
            margin: "0 .3rem",
            fontSize: ".7rem",
            padding: ".3rem .6rem",
        },
    },
    select: {
        padding: ".3rem .6rem",
        fontSize: ".9rem",
        fontFamily: "Product-Sans",
        outline: "none",
        border: "none",
        cursor: "pointer",
    },
    amount: {
        outline: "none",
        border: "none",
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        padding: ".7rem",
        "&::placeholder": {
            color: "#D9D9D9",
        },
    },
    unit: {
        fontFamily: "Product-Sans",
        width: "1.8rem",
        textAlign: "center",
        outline: "none",
        border: "none",
    },
    editForm: {
        display: "flex",
        margin: ".7rem 0",
        justifyContent: "space-around",
    },
});

const DishIngredientTabEdit = (props) => {
    const classes = useStyles();
    const [ing, setIng] = useState({});
    const [btnText, setBtnText] = useState("Save Changes");
    const { ingredients, ingredient } = props;

    useEffect(() => {
        if (ingredients.length > 0) {
            const index = _.findIndex(ingredients, {
                id: ingredient.id,
            });
            if (index !== -1) {
                setIng({
                    index: index,
                    name: ingredients[index].name,
                    unit: ingredients[index].unit,
                    amount: "",
                });
            } else {
                setIng({
                    index: 0,
                    name: ingredients[0].name,
                    unit: ingredients[0].unit,
                    amount: "",
                });
            }
        }
    }, [ingredients, setIng, ingredient]);

    const handleSaveChanges = () => {
        setBtnText("please wait ...");
        setTimeout(() => {
            props.editIngridentInMenu(props.item, props.ingredient.id, {
                id: ingredients[ing.index].id,
                name: ingredients[ing.index].name,
                amount: ing.amount,
                unit: ingredients[ing.index].unit,
            });
            setBtnText("Save Changes");
            props.setEdit(false);
        }, 4000);
    };

    return (
        <TableRow>
            <TableCell colSpan={4}>
                <Typography variant="h4" className={classes.title}>
                    Edit ingredient
                </Typography>

                {ing.index !== undefined ? (
                    <div className={classes.editForm}>
                        <select
                            value={ing.index}
                            className={classes.select}
                            onChange={(e) => {
                                setIng({
                                    ...ing,
                                    index: e.target.value,
                                });
                            }}
                        >
                            {props.ingredients.map((ingredient, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {ingredient.name}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="number"
                            value={ing.amount}
                            placeholder="amount"
                            className={classes.amount}
                            onChange={(e) => {
                                setIng({
                                    ...ing,
                                    amount: e.target.value,
                                });
                            }}
                        />

                        <input
                            type="text"
                            readOnly
                            value={ingredients[ing.index].unit}
                            className={classes.unit}
                        />
                    </div>
                ) : null}
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            props.setEdit(false);
                        }}
                    >
                        Cancle
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={
                            btnText.toLowerCase().includes("please wait")
                                ? true
                                : false
                        }
                        onClick={handleSaveChanges}
                    >
                        {btnText}
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

const mapStateToProps = ({ ingredients }) => ({ ingredients });
export default connect(mapStateToProps, { editIngridentInMenu })(
    DishIngredientTabEdit
);
