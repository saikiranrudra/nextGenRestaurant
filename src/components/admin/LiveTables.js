import React from "react";

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

const LiveTables = (props) => {
    const classes = useStyle();
    const { selectedTable, setSeletedTable } = props;
    const handleTableSelect = (tableData) => {
        setSeletedTable(tableData);
    };

    return (
        <div className={classes.container}>
            {props.tables.map((table, index) => {
                return (
                    <div
                        style={{
                            padding: ".4rem",
                            borderRadius: "10rem",
                            border:
                                selectedTable._id === table._id
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
                                    table.isVacant === false
                                        ? props.app.themeColor
                                        : null,
                                color: table.isVacant === false ? "#fff" : null,
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

const mapStateToProps = ({ app, tables }) => ({ app, tables });
export default connect(mapStateToProps)(LiveTables);
