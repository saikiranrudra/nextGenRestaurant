import React, { useState } from "react";

import { Button, Typography } from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//Action
import { fetchTables } from "./../../actions/general/table";

//API
import axios from "axios";
//Variables
import { baseURL } from "./../../variables";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    title: {
        marginTop: ".3rem",
        fontSize: "1rem",
        marginLeft: ".3rem",
    },
    input: {
        fontSize: ".9rem",
        padding: ".3rem .8rem",
        marginLeft: ".3rem",
        marginBottom: ".6rem",
        width: "98%",
    },

    btn: {
        transform: "scale(0.9)",
    },
    btnContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
});

const EditTableNumber = (props) => {
    const classes = useStyle();
    const [tableNo, setTableNo] = useState(props.table.tableNo);
    const [btnText, setBtnText] = useState("Save Changes");

    const handleSaveChange = () => {
        setBtnText("Please Wait...");
        axios
            .post(`${baseURL}/api/v1/table/updateTable`, {
                tableNo: tableNo,
                _id: props.table._id,
                token: props.staff.token,
            })
            .then((res) => {
                props.fetchTables();
                setBtnText("Save Changes");
                props.setEdit(false);
            })
            .catch((err) => {
                alert(err);
                console.log(err);
                setBtnText("Save Changes");
                props.setEdit(false);
            });
    };

    return (
        <>
            <Typography variant="h6" className={classes.title}>
                Edit Table Number
            </Typography>

            <input
                type="number"
                placeholder="Enter Table Number"
                value={tableNo}
                className={classes.input}
                onChange={(e) => {
                    setTableNo(e.target.value);
                }}
            />
            <div className={classes.btnContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={handleSaveChange}
                    disabled={
                        btnText.toLowerCase().includes("please wait")
                            ? true
                            : false
                    }
                >
                    {btnText}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={() => {
                        props.setEdit(false);
                    }}
                >
                    Cancle
                </Button>
            </div>
        </>
    );
};

const mapStateToProps = ({ staff }) => ({ staff });
export default connect(mapStateToProps, { fetchTables })(EditTableNumber);
