import React, { useState } from "react";

import { TableRow, TableCell, Button } from "@material-ui/core";

//assets
import edit from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// State Mangement
import { connect } from "react-redux";
// actions
import { deleteIngredients } from "./../../actions/customer";

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
    const handleDeleteIngredient = (ingredientItem) => {
        setBtnText({ ...btnText, delete: "please wait..." });
        setTimeout(() => {
            props.deleteIngredients(ingredientItem);
            setBtnText({ ...btnText, delete: "delete" });
        }, 4000);
    };
    return (
        <TableRow className={classes.tableBody}>
            <TableCell>{ingredientItem.name}</TableCell>
            <TableCell>{ingredientItem.unit}</TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    startIcon={
                        <img src={edit} alt="edit" style={{ width: "1rem" }} />
                    }
                    style={{
                        backgroundColor: "#fff",
                        fontSize: ".7rem",
                        padding: ".3rem",
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
                        btnText.delete.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText.delete}
                </Button>
            </TableCell>
        </TableRow>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    deleteIngredients,
})(IngredientManageTab);
