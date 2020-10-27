import React, { useState } from "react";

//components
import { TableRow, TableCell, Button } from "@material-ui/core";
import EditTableNumber from "./EditTableNumber";

// API
import axios from "axios";
// Variables
import { baseURL } from "./../../variables";

// State Management
import { connect } from "react-redux";
//actions
import { fetchTables } from "./../../actions/general/table";

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
    const [edit, setEdit] = useState(false);
    const [btnText, setBtnText] = useState("Delete");

    const handleDeleteTable = () => {
        setBtnText("please wait ...");
        axios
            .post(`${baseURL}/api/v1/table/deleteTable`, {
                _id: props.table._id,
                token: props.staff.token,
            })
            .then((res) => {
                props.fetchTables();
                setBtnText("Delete");
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setBtnText("Delete");
            });
    };

    if (edit === false) {
        return (
            <TableRow className={classes.tableBody}>
                <TableCell colSpan={2}>Table #{props.table.tableNo}</TableCell>
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
                        onClick={() => setEdit(true)}
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
                        onClick={handleDeleteTable}
                        disabled={
                            btnText.toLowerCase().includes("please wait")
                                ? true
                                : false
                        }
                    >
                        {btnText}
                    </Button>
                </TableCell>
            </TableRow>
        );
    } else {
        return (
            <TableRow>
                <TableCell colSpan={4}>
                    <EditTableNumber table={props.table} setEdit={setEdit} />
                </TableCell>
            </TableRow>
        );
    }
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps, { fetchTables })(TableManageTab);
