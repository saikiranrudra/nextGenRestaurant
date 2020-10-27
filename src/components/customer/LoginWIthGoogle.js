import React, { useState } from "react";

//components
import GoogleLogin from "react-google-login";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

// api access
import axios from "axios";

// State Management
import { connect } from "react-redux";
import { customerAuthenticate } from "./../../actions/customer";

// variables
import { baseURL, clientId } from "./../../variables";

//styling
// import { makeStyles } from "@material-ui/core/styles";

// const useStyle = makeStyles({
//   btn: {
//     backgroundColor: "#f5f5f5",
//     padding: ".5rem .8rem",
//     fontFamily: "Product-Sans",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "3rem",
//     fontSize: ".8rem",
//     width: "13rem",
//     outline: "none",
//     border: "none",
//     transition: "background-color .3s",
//     "&:active": {
//       backgroundColor: "#c3c3c3",
//     },
//   },
//   google: {
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//   },
//   btnText: {
//     fontSize: ".9rem",
//     marginLeft: ".5rem",
//   },
// });

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginWithGoogle = (props) => {
    // const classes = useStyle();
    const history = useHistory();

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        type: "error",
    });

    const handleSuccess = (response) => {
        const email = response.profileObj.email;
        axios
            .post(`${baseURL}/api/v1/users/signin`, { email })
            .then((res) => {
                props.customerAuthenticate(res.data.data);
                history.push("/customer/home");
            })
            .catch((err) => {
                console.log(err);
                if (err.response !== undefined) {
                    setNotification({
                        open: true,
                        type: "warning",
                        message: err.response.data.message,
                    });
                } else {
                    setNotification({
                        open: true,
                        type: "error",
                        message: "Something went wrong try again later",
                    });
                }
            });
    };

    const handleFailure = (response) => {
        console.log(response);
        setNotification({
            open: true,
            type: "error",
            message: "Something went wrong try again later",
        });
    };

    const handleClose = () => {
        setNotification({
            open: false,
            message: "",
            type: "error",
        });
    };

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
            />

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={notification.type}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { customerAuthenticate })(
    LoginWithGoogle
);
