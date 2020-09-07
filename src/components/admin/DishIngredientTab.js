import React, { useState } from "react";

//Components
import { TableRow, TableCell, Button } from "@material-ui/core";
import DishIngredientTabEdit from "./DishIngredientTabEdit";

//assets
import editIcon from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

//State Management
import { connect } from "react-redux";
import { removeIngredient } from "./../../actions/customer";

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
    const { ingredient, item } = props;
    const [btnText, setBtnText] = useState({ delete: "delete" });
    const [edit, setEdit] = useState(false);
    const handleDeleteIngredient = () => {
        setBtnText({ ...btnText, delete: "please wait..." });
        setTimeout(() => {
            props.removeIngredient(item, ingredient);
            setBtnText({ ...btnText, delete: "delete" });
        }, 4000);
    };
    return (
        <>
            {edit === false ? (
                <TableRow className={classes.tableBody}>
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>
                        {ingredient.amount}
                        {ingredient.unit}
                    </TableCell>
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
                            Edit
                        </Button>
                    </TableCell>
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
            ) : (
                <DishIngredientTabEdit
                    ingredient={ingredient}
                    item={item}
                    setEdit={setEdit}
                />
            )}
        </>
    );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { removeIngredient })(
    DishIngredientTab
);
