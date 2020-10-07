import React, { useState } from "react";

//Components
import { TableRow, TableCell, Button } from "@material-ui/core";
// import DishIngredientTabEdit from "./DishIngredientTabEdit";

//assets
// import editIcon from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//State Management
import { connect } from "react-redux";
import { removeIngredient, fetchMenuItems } from "./../../actions/customer";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    tableBody: {
        borderTop: "8px solid #f5f5f5",
        borderBottom: "5px solid #f5f5f5",
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            backgroundColor: "#fff",
        },
    },
});

const DishIngredientTab = (props) => {
    const classes = useStyle();
    // const { item } = props;
    const [btnText, setBtnText] = useState({ delete: "delete" });
    const handleDeleteIngredient = () => {
        setBtnText({ ...btnText, delete: "please wait..." });

        axios
            .post(`${baseURL}/api/v1/items/deleteIngredientFromItem`, {
                itemId: props.item._id,
                ingredientId: props.ingredient._id._id,
                token: props.staff.token,
            })
            .then((res) => {
                props.fetchMenuItems();
                setBtnText({ ...btnText, delete: "delete" });
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText({ ...btnText, delete: "delete" });
            });
    };

    if (props.ingredient._id !== null) {
        return (
            <>
                <TableRow className={classes.tableBody}>
                    <TableCell>{props.ingredient._id.name}</TableCell>
                    <TableCell>
                        {props.ingredient.amount}
                        {props.ingredient._id.unit}
                    </TableCell>
                    {/* <TableCell>
                        <Button
                            variant="contained"
                            startIcon={
                                <img
                                    src={editIcon}
                                    alt="edit"
                                    style={{ width: "1rem" }}
                                />
                            }
                            style={{
                                backgroundColor: "#fff",
                                fontSize: ".7rem",
                                padding: ".3rem",
                            }}
                            onClick={() => {
                                setEdit(true);
                            }}
                        >
                            Edit
                        </Button>
                    </TableCell> */}
                    <TableCell style={{ padding: 0 }}>
                        <Button
                            variant="contained"
                            startIcon={<DeleteOutlinedIcon />}
                            style={{
                                backgroundColor: "#fff",
                                fontSize: ".7rem",
                                padding: ".3rem .4rem",
                            }}
                            disabled={
                                btnText.delete
                                    .toLowerCase()
                                    .includes("please wait")
                                    ? true
                                    : false
                            }
                            onClick={handleDeleteIngredient}
                        >
                            {btnText.delete}
                        </Button>
                    </TableCell>
                </TableRow>
            </>
        );
    } else {
        return null;
    }
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps, { removeIngredient, fetchMenuItems })(
    DishIngredientTab
);
