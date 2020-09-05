import React, { useState, useEffect } from "react";
// import _ from "lodash";

//components
import { Typography, TableRow, TableCell, Button } from "@material-ui/core";

//State Management
import { connect } from "react-redux";

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
    name: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        padding: ".6rem .8rem",
        border: "none",
        outline: "none",
        margin: ".6rem 0",
    },
    unit: {
        fontFamily: "Product-Sans",
        fontSize: ".9rem",
        padding: ".6rem .8rem",
        margin: ".6rem 0",
        border: "none",
        outline: "none",
    },
    formContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 70px",
        gridGap: ".4rem",
    },
});

const IngridentEdit = (props) => {
    const classes = useStyles();
    const [ingredient, setIngredient] = useState(props.ingredientItem);
    const [btnText, setBtnText] = useState("Save Changes");

    useEffect(() => {
        setIngredient(props.ingredientItem);
    }, [props.ingredientItem]);

    const handleSaveChanges = () => {
        setBtnText("please wait...");
        setTimeout(() => {
            setBtnText("Save Changes");
        }, 3000);
    };

    return (
        <TableRow>
            <TableCell colSpan={4}>
                <Typography variant="h4" className={classes.title}>
                    Edit ingredient
                </Typography>
                <div className={classes.formContainer}>
                    <input
                        type="text"
                        value={ingredient.name}
                        className={classes.name}
                        placeholder="Name"
                        onChange={(e) => {
                            setIngredient({
                                ...ingredient,
                                name: e.target.value,
                            });
                        }}
                    />

                    <select
                        value={ingredient.unit}
                        className={classes.unit}
                        onChange={(e) => {
                            setIngredient({
                                ...ingredient,
                                unit: e.target.value,
                            });
                        }}
                    >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="nos  ">nos</option>
                    </select>
                </div>

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
export default connect(mapStateToProps)(IngridentEdit);
