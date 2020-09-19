import React, { useState } from "react";

// Components
import GoogleLogin from "react-google-login";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//variables
import { clientId, baseURL } from "./../../variables";
import axios from "axios";

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

const SignUpWithGoogle = (props) => {
    // const classes = useStyle();
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        type: "error",
    });

    const handleClose = () => {
        setNotification({
            open: false,
            message: "",
            type: "error",
        });
    };

    const handleSuccess = (response) => {
        const user = {
            email: response.profileObj.email,
            name: response.profileObj.name,
        };

        axios
            .post(`${baseURL}/api/v1/users/signup`, user)
            .then((res) => {
                setNotification({
                    open: true,
                    message:
                        "User created successfully rescan qr and login again",
                    type: "success",
                });
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
        // axios
        //     .post(`${baseURL}/api/v1/users/signup`, { email })
        // .then((res) => {
        //     props.customerAuthenticate(res.data.data);
        //     history.push("/customer/home");
        // })
        // .catch((err) => {
        //     console.log(err);
        //     if (err.response !== undefined) {
        //         setNotification({
        //             open: true,
        //             type: "warning",
        //             message: err.response.data.message,
        //         });
        //     } else {
        //         setNotification({
        //             open: true,
        //             type: "error",
        //             message: "Something went wrong try again later",
        //         });
        //     }
        // });
    };

    const handleFailure = (response) => {
        console.log(response);
        setNotification({
            open: true,
            type: "error",
            message: "Something went wrong try again later",
        });
    };

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign Up with google"
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

export default SignUpWithGoogle;
