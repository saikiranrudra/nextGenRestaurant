import React from "react";

// react router dom
import { BrowserRouter, Route } from "react-router-dom";

// apps
import Customer from "./apps/Customer";
import Admin from "./apps/Admin";

//global css
import "./global.css";
import { CssBaseline, Container } from "@material-ui/core";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <Route path="/customer">
          <Container maxWidth="sm" style={{ padding: 0 }}>
            <Customer />
          </Container>
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </>
    </BrowserRouter>
  );
};
export default App;
