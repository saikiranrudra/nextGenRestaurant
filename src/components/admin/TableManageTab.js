import React from "react";

//components
import { TableRow, TableCell, Button } from "@material-ui/core";

//assets
import editIcon from "./../..//assets/dashboardAssets/edit.svg";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    tableBody: {
        border: "8px solid #f5f5f5",
        // borderBottom: "5px solid #f5f5f5",
        "& > td": {
            fontFamily: "Product-Sans",
            fontWeight: "bold",
            backgroundColor: "#fff",
        },
    },
});

const TableManageTab = (props) => {
    const classes = useStyle();
    return (
        <TableRow className={classes.tableBody}>
            <TableCell colSpan={2}>Table #{props.table}</TableCell>
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
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default TableManageTab;
