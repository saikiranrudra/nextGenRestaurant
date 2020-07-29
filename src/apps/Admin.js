import React from "react";

//Routing
import { Route } from "react-router-dom";

// pages
import Login from "./../pages/admin/Login";
import ScreenLogin from "./../pages/admin/ScreenLogin";
import Dashboard from "./../pages/admin/Dashboard";

const Admin = () => {
  return (
    <>
      <Route path="/admin/login" exact>
        <Login />
      </Route>
      <Route path="/admin/screenlogin" exact>
        <ScreenLogin />
      </Route>
      <Route path="/admin/dashboard" exact>
        <Dashboard />
      </Route>
    </>
  );
};

export default Admin;