import React from "react";

//Components
import { Typography, Button, Table, TableBody } from "@material-ui/core";
import TableManageTab from "./../../components/admin/TableManageTab";

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

const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TablesManager = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h6" className={classes.title}>
                Add Table
            </Typography>
            <div className={classes.tableForm}>
                <input type="number" placeholder="Table Number" />
                <Button variant="contained" color="primary">
                    Add +
                </Button>
            </div>

            <Table>
                <TableBody>
                    {dummyData.map((table, index) => {
                        return <TableManageTab key={index} table={table} />;
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default TablesManager;
