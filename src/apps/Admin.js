import React, { useEffect } from "react";

//Routing
import { Route } from "react-router-dom";

// state management
import { connect } from "react-redux";
// action
import { fetchMenuItems } from "./../actions/customer";

// pages
import Login from "./../pages/admin/Login";
import ScreenLogin from "./../pages/admin/ScreenLogin";
import Dashboard from "./../pages/admin/Dashboard";
import Orders from "./../pages/admin/Orders";
import Menu from "./../pages/admin/Menu";

const Admin = (props) => {
  const { fetchMenuItems } = props;
  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

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
      <Route path="/admin/dashboard/orders">
        <Orders />
      </Route>
      <Route path="/admin/dashboard/menu">
        <Menu />
      </Route>
    </>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetchMenuItems })(Admin);
