import React, { useState } from "react";

// Components
import { TableRow, TableCell, Button } from "@material-ui/core";
import IngridentEdit from "./IngridentEdit";

//assets
import editIcon from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// API
import axios from "axios";
// Variables
import { baseURL } from "./../../variables";

// State Mangement
import { connect } from "react-redux";
// actions
import { fetchIngredients, fetchMenuItems } from "./../../actions/customer";

//styling
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
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

const IngredientManageTab = (props) => {
    const classes = useStyle();
    const { ingredientItem } = props;
    const [btnText, setBtnText] = useState({ delete: "delete" });
    const [edit, setEdit] = useState(false);

    const handleDeleteIngredient = () => {
        setBtnText({ ...btnText, delete: "please wait..." });

        axios
            .post(
                `${baseURL}/api/v1/ingredient/deleteIngredientAndIngredientFromItem`,
                {
                    id: ingredientItem._id,
                    token: props.staff.token,
                }
            )
            .then((res) => {
                props.fetchMenuItems();
                props.fetchIngredients();
                setBtnText({ ...btnText, delete: "delete" });
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText({ ...btnText, delete: "delete" });
            });
    };

    return (
        <>
            {edit === false ? (
                <TableRow className={classes.tableBody}>
                    <TableCell>{ingredientItem.name}</TableCell>
                    <TableCell>{ingredientItem.unit}</TableCell>
                    <TableCell>
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
                            edit
                        </Button>
                    </TableCell>
                    <TableCell style={{ padding: 0 }}>
                        <Button
                            variant="contained"
                            startIcon={<DeleteOutlinedIcon />}
                            style={{
                                backgroundColor: "#fff",
                                fontSize: ".7rem",
                                padding: ".3rem",
                            }}
                            onClick={() => {
                                handleDeleteIngredient();
                            }}
                            disabled={
                                btnText.delete
                                    .toLowerCase()
                                    .includes("please wait")
                                    ? true
                                    : false
                            }
                        >
                            {btnText.delete}
                        </Button>
                    </TableCell>
                </TableRow>
            ) : (
                <IngridentEdit
                    ingredientItem={ingredientItem}
                    setEdit={setEdit}
                />
            )}
        </>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });

export default connect(mapStateToProps, {
    fetchMenuItems,
    fetchIngredients,
})(IngredientManageTab);
