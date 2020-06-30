import React from "react";

// pages
import Auth from "./../pages/customer/Auth";
import NeedHelp from "./../pages/customer/NeedHelp";
import SignUp from "./../pages/customer/SignUp";

//routing
import { Route } from "react-router-dom";

// component

const Customer = () => {
  return (
    <>
      <Route path="/customer/" exact>
        <Auth />
      </Route>
      <Route path="/customer/signup" exact>
        <SignUp />
      </Route>
      <Route path="/customer/needhelp" exact>
        <NeedHelp />
      </Route>
    </>
  );
};

export default Customer;
