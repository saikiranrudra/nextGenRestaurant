import React, { useEffect } from "react";

//SOCKETIO
import socket from "./socket";

// react router dom
import { BrowserRouter, Route } from "react-router-dom";

// apps
import Customer from "./apps/Customer";
import Admin from "./apps/Admin";
import Kitchen from "./apps/Kitchen";
import CustomerRepresentative from "./apps/CustomerRepresentative";

//State Management
import { connect } from "react-redux";
//Actions
import { fetchAppData } from "./actions/general/app";
import { fetchTables } from "./actions/general/table";
//global css
import "./global.css";
import { CssBaseline, Container } from "@material-ui/core";

// theming
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const App = (props) => {
    const { fetchAppData, fetchTables } = props;

    useEffect(() => {
        fetchAppData();
        fetchTables();
    }, [fetchAppData, fetchTables]);


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: props.app.themeColor || "#FC6565",
            },
            secondary: {
                // This is green.A700 as hex.
                main: "#11cb5f",
            },
        },
    });

    socket.on('connect', function(){
        console.log("Socket Connection established")
    });


    return (
        <BrowserRouter>
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Route path="/customer">
                        <Container maxWidth="sm" style={{ padding: 0 }}>
                            <Customer />
                        </Container>
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/kitchen">
                        <Kitchen />
                    </Route>
                    <Route path="/cr">
                        <Container maxWidth="sm" style={{ padding: 0 }}>
                            <CustomerRepresentative />
                        </Container>
                    </Route>

                    <Route path="/customerrepresentative">
                        <Container maxWidth="sm" style={{ padding: 0 }}>
                            <CustomerRepresentative />
                        </Container>
                    </Route>
                </ThemeProvider>
            </>
        </BrowserRouter>
    );
};

const mapStateToProps = ({ app }) => ({ app });
export default connect(mapStateToProps, {
    fetchAppData,
    fetchTables,
})(App);
