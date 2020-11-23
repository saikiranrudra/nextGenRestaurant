import React, { useState } from "react";

//Components
import { Typography, Button, Table, TableBody } from "@material-ui/core";
import TableManageTab from "./../../components/admin/TableManageTab";

//State Managemert
import { connect } from "react-redux";
//Action
import { fetchTables } from "./../../actions/general/table";

//API
import axios from "axios";
//Variable
import { baseURL } from "./../../variables";

//utils
import {printQR} from "./../../utils/functions";

//Assets
import PrintIcon from '@material-ui/icons/Print';

//styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "1.2rem",
        overflowX: "hidden",
        overflowY: "scroll",
        height: "90vh",
    },
    title: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontSize: "1.6rem",
    },
    tableForm: {
        display: "flex",
        justifyContent: "space-between",
        '& > input[type="number"]': {
            border: "1px solid #D9D9D9",
            fontSize: ".9rem",
            fontFamily: "Product-Sans",
            borderRadius: "5px",
            padding: "0.6rem 0.8rem",
            width: "19rem",
        },
    },
});

const TablesManager = (props) => {
    const classes = useStyles();
    const [tableNo, setTableNo] = useState("");
    const [btnText, setBtnText] = useState("Add +");

    const handleAddTable = () => {
        setBtnText("please wait...");
        axios
            .post(`${baseURL}/api/v1/table/createTable`, {
                token: props.staff.token,
                tableNo: tableNo,
            })
            .then((res) => {
                props.fetchTables();
                setBtnText("Add +");
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText("Add +");
            });
    };

    const printAllQR = () => {
        props.tables.forEach(table => {
            printQR(table._id);
        })
    }

    return (
        <div className={classes.container}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: ".8rem" }}>
                <Typography variant="h6" className={classes.title}>
                    Add Table
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<PrintIcon />}
                    style={{ marginLeft: "auto" }}

                    onClick={printAllQR}
                >
                    Print All
                </Button>

            </div>
            <div className={classes.tableForm}>
                <input
                    type="number"
                    placeholder="Table Number"
                    value={tableNo}
                    onChange={(e) => {
                        setTableNo(e.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTable}
                    disabled={
                        btnText.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText}
                </Button>
            </div>

            <Table>
                <TableBody>
                    {props.tables.map((table, index) => {
                        return <TableManageTab key={index} table={table} />;
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const mapStateToProps = ({ tables, staff }) => ({ tables, staff });
export default connect(mapStateToProps, { fetchTables })(TablesManager);
