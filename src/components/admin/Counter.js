import React from "react";

//components
import { IconButton } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

import _ from "lodash";

const useStyle = makeStyles({
    container: {
        display: "flex",
        width: "5.3rem",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "1.3rem",
        backgroundColor: "#d5d5d5",
        borderRadius: "4px",
    },
    box: {
        fontFamily: "Product-Sans",
        padding: "0 .3rem",
        "& > button": {
            padding: 0,
        },
    },
});

const handleCount = (
    type,
    orderIndex,
    itemIndex,
    count,
    tableData,
    setTableData
) => {
    let data = _.clone(tableData);
    if (count.normalCount !== undefined) {
        type === "increment"
            ? ++data[orderIndex].items[itemIndex].normalCount
            : --data[orderIndex].items[itemIndex].normalCount;
    } else if (count.jainCount !== undefined) {
        type === "increment"
            ? ++data[orderIndex].items[itemIndex].jainCount
            : --data[orderIndex].items[itemIndex].jainCount;
    }
    setTableData(data);
};

const Counter = (props) => {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <div
                onClick={() => {
                    let count = {
                        normalCount:
                            props.normalCount !== undefined
                                ? props.normalCount
                                : undefined,
                        jainCount:
                            props.jainCount !== undefined
                                ? props.jainCount
                                : undefined,
                    };

                    handleCount(
                        "increment",
                        props.orderIndex,
                        props.itemIndex,
                        count,
                        props.tableData,
                        props.setTableData
                    );
                }}
                style={{ borderRight: "1px solid #fff" }}
                className={classes.box}
            >
                <IconButton>+</IconButton>
            </div>
            <div className={classes.box}>
                {props.normalCount !== undefined
                    ? props.normalCount
                    : props.jainCount}
            </div>
            <div
                onClick={() => {
                    let count = {
                        normalCount:
                            props.normalCount !== undefined
                                ? props.normalCount
                                : undefined,
                        jainCount:
                            props.jainCount !== undefined
                                ? props.jainCount
                                : undefined,
                    };
                    if (props.normalCount > 0 || props.jainCount > 0) {
                        handleCount(
                            "decrement",
                            props.orderIndex,
                            props.itemIndex,
                            count,
                            props.tableData,
                            props.setTableData
                        );
                    }
                }}
                style={{ borderLeft: "1px solid #fff" }}
                className={classes.box}
            >
                <IconButton>-</IconButton>
            </div>
        </div>
    );
};

export default Counter;
