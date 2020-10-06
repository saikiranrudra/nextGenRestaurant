import React, { useState } from "react";

//State Management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 50px)",
        gridTemplateRows: "50px",
        gridAutoRows: "50px",
    },

    table: {
        fontFamily: "Product-Sans",
        fontWeight: "bold",
        fontSize: "1.3rem",
        borderRadius: "10rem",
        border: "1px solid #989898",
        display: "grid",
        placeContent: "center",
        cursor: "pointer",
        width: "2.3rem",
        height: "2.3rem",
    },
});

const tablesData = [
    {
        tableNo: 1,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 2,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 3,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 4,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 5,
        vacant: false,
        selected: false,
    },
    {
        tableNo: 6,
        vacant: false,
        selected: false,
    },
    {
        tableNo: 7,
        vacant: false,
        selected: false,
    },
    {
        tableNo: 8,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 9,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 10,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 11,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 12,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 13,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 14,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 15,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 16,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 17,
        vacant: true,
        selected: false,
    },
    {
        tableNo: 18,
        vacant: false,
        selected: false,
    },
    {
        tableNo: 19,
        vacant: false,
        selected: false,
    },
    {
        tableNo: 20,
        vacant: true,
        selected: false,
    },
];
const LiveTables = (props) => {
    const classes = useStyle();
    const [tables, setTables] = useState(tablesData);

    const handleTableSelect = (tableData) => {
        let newState = tables;

        newState.forEach((table, index) => {
            if (table.tableNo === tableData.tableNo) {
                newState[index].selected = true;
            } else {
                if (table.selected === true) {
                    newState[index].selected = false;
                }
            }
        });
        setTables([...newState]);
        console.log(tables);
    };

    return (
        <div className={classes.container}>
            {tables.map((table, index) => {
                return (
                    <div
                        style={{
                            padding: ".4rem",
                            borderRadius: "10rem",
                            border: table.selected
                                ? `4px solid ${props.app.themeColor}`
                                : null,
                            display: "grid",
                            placeContent: "center",
                        }}
                        key={index}
                    >
                        <div
                            className={classes.table}
                            style={{
                                backgroundColor:
                                    table.vacant === false
                                        ? props.app.themeColor
                                        : null,
                                color: table.vacant === false ? "#fff" : null,
                            }}
                            onClick={() => {
                                handleTableSelect(table);
                            }}
                        >
                            {table.tableNo}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps)(LiveTables);
