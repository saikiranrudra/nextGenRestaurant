import React, {useState} from "react";

//components
import {
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Navigation from "./../../components/customer/Navigation";

//Variable
import { baseURL } from "./../../variables";

//state management
import { connect } from "react-redux";
//actions
import { customerAuthenticate, setTableNo } from "./../../actions/customer";

//Routing
import {useHistory} from "react-router-dom";

//API
import axios from "axios";


// images
import logo from "./../../assets/logo.png";

//styling
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        placeContent: "center",
        height: "100vh",
    },
    logo: {
        width: "16rem",
    },
    heading: {
        color: theme.palette.primary.main,
        marginTop: "2rem",
        fontSize: "1.4rem",
    },
    tableSelectBtn: {
        borderRadius: "2rem",
    },
}));

const TableSelect = (props) =>  {
    const classes = useStyles();
    const [selectTable, setSelectTable] = useState("");    
    const [open, setOpen] = useState(false);
    const [btn, setBtn] = useState({text: "Go!", disabled: false});
    const [email, setEmail] = useState("");
    const history = useHistory();

    const selectTableHandle = (event) => {
        setSelectTable(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGoBtn = async () => {
        if (selectTable === "") {
            setOpen(true);
        } else {
            setBtn({ text: "Please wait...", disabled: true });
            props.setTableNo(selectTable);

            try {

                const user = await axios.post(`${baseURL}/api/v1/users/signin`, {email});
                props.customerAuthenticate(user.data.data);
                setBtn({
                    btn: {
                        text: "Go!",
                        disabled: false,
                    },
                });
                history.push("/cr/home");
            } catch(err) {
                console.log(err);
                alert(err);
                setBtn({
                    btn: {
                        text: "Go!",
                        disabled: false,
                    },
                });
            }


        }
    };

    return (
        <div className={classes.container}>
            <img
                src={
                    props.app.img
                        ? `${baseURL}${props.app.img}`
                        : logo
                }
                alt="logo"
                className={classes.logo}
            />

            <Typography
                variant="h6"
                align="center"
                className={classes.heading}
                style={{ fontFamily: "Product-Sans" }}
            >
                Enter Email
            </Typography>    
            
            <input
                type="text"
                placeholder="Customer Email"
                style={{
                    fontFamily: "Product-Sans",
                    fontSize: ".95rem",
                    padding: ".4rem",
                }}
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}

            />

            <Typography
                variant="h6"
                align="center"
                className={classes.heading}
                style={{ fontFamily: "Product-Sans" }}
            >
                Select Table
            </Typography>

            <FormControl variant="filled">
                <InputLabel style={{ fontFamily: "Product-Sans" }}>
                    Table No
                </InputLabel>
                <Select
                    value={selectTable}
                    onChange={selectTableHandle}
                    style={{ fontFamily: "Product-Sans" }}
                >
                    <MenuItem
                        value={""}
                        style={{ fontFamily: "Product-Sans" }}
                    >
                        None
                    </MenuItem>
                    {props.tables.map((table, index) => (
                        <MenuItem
                            value={table._id}
                            key={index}
                            style={{ fontFamily: "Product-Sans" }}
                        >{`Table No ${table.tableNo}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
                
            <Button
                variant="contained"
                color="primary"
                disabled={btn.disabled}
                style={{
                    fontFamily: "Product-Sans",
                    justifySelf: "center",
                    marginTop: "1rem",
                }}
                onClick={handleGoBtn}
            >
                {btn.text}
            </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        Please Select Table No
                    </Alert>
                </Snackbar>
                <Navigation>
                    <center>
                        <Button variant="contained" color="primary">
                            Table Select
                        </Button>
                    </center>
                </Navigation>
            </div>
        );
}

const mapStateToProps = ({ app, tables }) => ({ app, tables });

export default connect(mapStateToProps, { customerAuthenticate, setTableNo })(TableSelect)

