import React, { useState } from "react";

// Components
import { TableRow, TableCell, Button } from "@material-ui/core";
import IngridentEdit from "./IngridentEdit";

//assets
import editIcon from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// State Mangement
import { connect } from "react-redux";
// actions
import {
    deleteIngredients,
    deleteIngredientFromAllItems,
} from "./../../actions/customer";

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

    const handleDeleteIngredient = (ingredientItem) => {
        setBtnText({ ...btnText, delete: "please wait..." });
        setTimeout(() => {
            props.deleteIngredientFromAllItems(ingredientItem);
            props.deleteIngredients(ingredientItem);
            setBtnText({ ...btnText, delete: "delete" });
        }, 4000);
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
                                handleDeleteIngredient(ingredientItem);
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    deleteIngredients,
    deleteIngredientFromAllItems,
})(IngredientManageTab);
