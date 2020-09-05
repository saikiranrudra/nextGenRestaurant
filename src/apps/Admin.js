import React, { useEffect } from "react";

//Routing
import { Route } from "react-router-dom";

// state management
import { connect } from "react-redux";
// action
import { fetchMenuItems, fetchCategories } from "./../actions/customer";

// pages
import Login from "./../pages/admin/Login";
import ScreenLogin from "./../pages/admin/ScreenLogin";
import Dashboard from "./../pages/admin/Dashboard";
import Orders from "./../pages/admin/Orders";
import Menu from "./../pages/admin/Menu";
import Staff from "./../pages/admin/Staff";
import Inventory from "./../pages/admin/Inventory";
import Setting from "../pages/admin/Setting";

const Admin = (props) => {
    const { fetchMenuItems, fetchCategories } = props;
    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
    }, [fetchMenuItems, fetchCategories]);

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
            <Route path="/admin/dashboard/staff">
                <Staff />
            </Route>
            <Route path="/admin/dashboard/inventory">
                <Inventory />
            </Route>
            <Route path="/admin/dashboard/setting">
                <Setting />
            </Route>
        </>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetchMenuItems, fetchCategories })(
    Admin
);
