import React, { useState, useEffect } from "react";

//Components
import {
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@material-ui/core";
import DishIngredientTab from "./DishIngredientTab";

// State Management
import { connect } from "react-redux";
//Actions
import { fetchMenuItems } from "./../../actions/customer";

//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    container: {
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        padding: "1.2rem",
    },
    id: {
        fontFamily: "Product-Sans",
        fontSize: "0.9rem",
        fontWeight: "normal",
    },
    name: {
        fontFamily: "Product-Sans",
        fontSize: "2.2rem",
        fontWeight: "bold",
        lineHeight: "2.8rem",
    },
    tableBody: {
        border: "8px solid #f5f5f5",
        // borderBottom: "5px solid #f5f5f5",
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            backgroundColor: "#fff",
        },
    },
    unit: {
        fontFamily: "Product-Sans",
        width: "1.8rem",
        textAlign: "center",
        outline: "none",
        border: "none",
    },
    select: {
        padding: ".3rem .6rem",
        fontSize: ".9rem",
        fontFamily: "Product-Sans",
        outline: "none",
        border: "none",
        cursor: "pointer",
    },
    inputCell: {
        padding: 0,
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
});

const DishIngredient = (props) => {
    const classes = useStyle();
    const [btnText, setBtnText] = useState("Add +");
    const { ingredients } = props;
    const [ing, setIng] = useState(null);

    useEffect(() => {
        setIng(
            ingredients.length > 0
                ? {
                      index: 0,
                      name: ingredients[0].name,
                      unit: ingredients[0].unit,
                      amount: "",
                  }
                : {}
        );
    }, [ingredients, setIng]);

    const handleAddIngredientToItem = () => {
        setBtnText("please wait...");

        let data = {};
        data["_id"] = props.item._id;
        data["newIngredient"] = {
            _id: props.ingredients[ing.index]._id,
            amount: ing.amount,
        };
        data["token"] = props.staff.token;

        axios
            .post(`${baseURL}/api/v1/ingredient/addIngredientToItem`, data)
            .then((res) => {
                props.fetchMenuItems();
                setBtnText("add +");
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText("add +");
            });
    };

    return (
        <div className={classes.container}>
            <Typography variant="body1" align="left" className={classes.id}>
                {props.item._id}
            </Typography>
            <Typography variant="h6" align="left" className={classes.name}>
                {props.item.name}
            </Typography>

            <Table>
                <TableBody>
                    {props.item.Ingredients !== undefined
                        ? props.item.Ingredients.map((ingredient, index) => {
                              return (
                                  <DishIngredientTab
                                      ingredient={ingredient}
                                      key={index}
                                      item={props.item}
                                  />
                              );
                          })
                        : null}
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    {props.item._id !== undefined && ing.index !== undefined ? (
                        <>
                            <TableRow className={classes.tableBody}>
                                <TableCell
                                    colSpan={2}
                                    className={classes.inputCell}
                                    style={{ borderRight: "4px solid #F5F5F5" }}
                                >
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
                                        {props.ingredients.map(
                                            (ingredient, index) => {
                                                return (
                                                    <option
                                                        value={index}
                                                        key={index}
                                                    >
                                                        {ingredient.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </TableCell>
                                <TableCell
                                    colSpan={1}
                                    className={classes.inputCell}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
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
                                </TableCell>
                                <TableCell
                                    colSpan={1}
                                    style={{ borderLeft: "4px solid #F5F5F5" }}
                                    className={classes.inputCell}
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        value={ingredients[ing.index].unit}
                                        className={classes.unit}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    align="right"
                                    style={{
                                        paddingRight: "4px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddIngredientToItem}
                                        disabled={
                                            btnText
                                                .toLowerCase()
                                                .includes("please wait")
                                                ? true
                                                : false
                                        }
                                    >
                                        {btnText}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </>
                    ) : null}
                </TableBody>
            </Table>
        </div>
    );
};

const mapStateToProps = ({ ingredients, menu, staff }) => ({
    ingredients,
    menu,
    staff,
});

export default connect(mapStateToProps, { fetchMenuItems })(DishIngredient);
