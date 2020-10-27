import React, { useEffect } from "react";

//Routing
import { Route } from "react-router-dom";

// Socket
import socket from "./../socket";

// state management
import { connect } from "react-redux";
// action
import { fetchMenuItems, fetchCategories } from "./../actions/customer";
import { fetchEmployee } from "./../actions/admin";
import {fetchTables} from "./../actions/general/table";

// pages
import Login from "./../pages/admin/Login";
import ScreenLogin from "./../pages/admin/ScreenLogin";
import Dashboard from "./../pages/admin/Dashboard";
import Orders from "./../pages/admin/Orders";
import Menu from "./../pages/admin/Menu";
import Staff from "./../pages/admin/Staff";
import Inventory from "./../pages/admin/Inventory";
import Setting from "./../pages/admin/Setting";

import AdminProtect from "./../components/admin/AdminProtect";

const Admin = (props) => {
    const { fetchMenuItems, fetchCategories, fetchEmployee } = props;
    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
        fetchEmployee();
    }, [fetchMenuItems, fetchCategories, fetchEmployee]);

    socket.on("FETCH_TABLES", () => {
        props.fetchTables();
    })

    return (
        <>
            <Route path="/admin/login" exact>
                <Login />
            </Route>
            <Route path="/admin/screenlogin" exact>
                <ScreenLogin />
            </Route>
            <Route path="/admin/dashboard" exact>
                <AdminProtect>
                    <Dashboard />
                </AdminProtect>
            </Route>
            <Route path="/admin/dashboard/orders">
                <AdminProtect>
                    <Orders />
                </AdminProtect>
            </Route>
            <Route path="/admin/dashboard/menu">
                <AdminProtect>
                    <Menu />
                </AdminProtect>
            </Route>
            <Route path="/admin/dashboard/staff">
                <AdminProtect>
                    <Staff />
                </AdminProtect>
            </Route>
            <Route path="/admin/dashboard/inventory">
                <AdminProtect>
                    <Inventory />
                </AdminProtect>
            </Route>
            <Route path="/admin/dashboard/setting">
                <AdminProtect>
                    <Setting />
                </AdminProtect>
            </Route>
        </>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    fetchMenuItems,
    fetchCategories,
    fetchEmployee,
    fetchTables
})(Admin);
