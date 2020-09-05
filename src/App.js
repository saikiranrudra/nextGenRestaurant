import React, { useEffect } from "react";

// react router dom
import { BrowserRouter, Route } from "react-router-dom";

// apps
import Customer from "./apps/Customer";
import Admin from "./apps/Admin";
import Kitchen from "./apps/Kitchen";
import CustomerRepresentative from "./apps/CustomerRepresentative";

//State Management
import { connect } from "react-redux";
import { fetchTheme } from "./actions/general/theme";
import { fetchAppState } from "./actions/general/appState";

//global css
import "./global.css";
import { CssBaseline, Container } from "@material-ui/core";

// theming
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const App = (props) => {
    const { fetchTheme, fetchAppState } = props;

    useEffect(() => {
        fetchTheme();
        fetchAppState();
    }, [fetchTheme, fetchAppState]);

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: props.theme.primary,
            },
            secondary: {
                // This is green.A700 as hex.
                main: "#11cb5f",
            },
        },
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

const mapStateToProps = ({ theme }) => ({ theme });
export default connect(mapStateToProps, { fetchTheme, fetchAppState })(App);
