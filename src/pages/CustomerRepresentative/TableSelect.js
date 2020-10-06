import React from "react";

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
import { customerAuthenticate } from "./../../actions/customer";

// Routing
import { withRouter } from "react-router-dom";

// images
import logo from "./../../assets/logo.png";

//styling
import { withStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
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
});

class TableSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            selectTable: -1,
            open: false,
            btn: {
                text: "Go!",
                disabled: false,
            },
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                tables: [
                    { tableNo: 1, userId: "abc123" },
                    { tableNo: 2, userId: "def123" },
                    { tableNo: 3, userId: "ghi123" },
                    { tableNo: 4, userId: "jkl123" },
                    { tableNo: 5, userId: "mno123" },
                ],
            });
        }, 4000);
    }

    selectTableHandle = (event) => {
        this.setState({ selectTable: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleGoBtn = () => {
        if (this.state.selectTable === -1) {
            this.setState({ open: true });
        } else {
            // fetch user at that table number
            // if user dosnt exist make it cr
            this.setState({ btn: { text: "Please wait...", disabled: true } });
            const { history } = this.props;

            setTimeout(() => {
                this.props.customerAuthenticate({
                    email: "saikiranrudra2@gmail.com",
                });
                this.setState({
                    btn: {
                        text: "Go!",
                        disabled: false,
                    },
                });
                history.push("/cr/home");
            }, 4000);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <img
                    src={
                        this.props.app.img
                            ? `${baseURL}${this.props.app.img}`
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
                    Select Table
                </Typography>

                <FormControl variant="filled">
                    <InputLabel style={{ fontFamily: "Product-Sans" }}>
                        Table No
                    </InputLabel>
                    <Select
                        value={this.state.selectTable}
                        onChange={this.selectTableHandle}
                        style={{ fontFamily: "Product-Sans" }}
                    >
                        <MenuItem
                            value={-1}
                            style={{ fontFamily: "Product-Sans" }}
                        >
                            None
                        </MenuItem>
                        {this.state.tables.map((table, index) => (
                            <MenuItem
                                value={table.tableNo}
                                key={index}
                                style={{ fontFamily: "Product-Sans" }}
                            >{`Table No ${table.tableNo}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.btn.disabled}
                    style={{
                        fontFamily: "Product-Sans",
                        justifySelf: "center",
                        marginTop: "1rem",
                    }}
                    onClick={this.handleGoBtn}
                >
                    {this.state.btn.text}
                </Button>
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <Alert onClose={this.handleClose} severity="error">
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
}

const mapStateToProps = ({ app }) => ({ app });

export default withRouter(
    connect(mapStateToProps, { customerAuthenticate })(
        withStyles(styles)(TableSelect)
    )
);
