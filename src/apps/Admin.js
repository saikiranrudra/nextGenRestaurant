import React from "react";

//Routing
import { Route } from "react-router-dom";

// pages
import Login from "./../pages/admin/Login";
import ScreenLogin from "./../pages/admin/ScreenLogin";

const Admin = () => {
  return (
    <>
      <Route path="/admin/login" exact>
        <Login />
      </Route>
      <Route path="/admin/screenlogin" exact>
        <ScreenLogin />
      </Route>
    </>
  );
};

export default Admin;
