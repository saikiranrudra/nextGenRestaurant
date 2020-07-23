import React from "react";

// react router dom
import { BrowserRouter, Route } from "react-router-dom";

// apps
import Customer from "./apps/Customer";
import Admin from "./apps/Admin";
import Kitchen from "./apps/Kitchen";
import CustomerRepresentative from "./apps/CustomerRepresentative";

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
      </>
    </BrowserRouter>
  );
};
export default App;
