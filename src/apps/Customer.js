import React, { useEffect } from "react";

// pages
import Auth from "./../pages/customer/Auth";
import NeedHelp from "./../pages/customer/NeedHelp";
import SignUp from "./../pages/customer/SignUp";
import Home from "./../pages/customer/Home";
import OrderConfirm from "./../pages/customer/OrderConfirm";
import Order from "./../pages/customer/Orders";

//routing
import { Route } from "react-router-dom";
import CustomerProtect from "./../components/customer/CustomerProtect";

//state management
import { connect } from "react-redux";
//actions
import {
  fetchMenuItems,
  fetchCategories,
  previousOrder,
} from "./../actions/customer";
// component

const Customer = (props) => {
  const { fetchMenuItems, previousOrder, fetchCategories } = props;

  // fetch menu
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
    previousOrder();
  }, [fetchMenuItems, fetchCategories, previousOrder]);

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
      <Route path="/customer/home" exact>
        <CustomerProtect>
          <Home />
        </CustomerProtect>
      </Route>
      <Route path="/customer/orderconfirm" exact>
        <OrderConfirm />
      </Route>
      <Route path="/customer/orders" exact>
        <Order />
      </Route>
    </>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
  fetchMenuItems,
  fetchCategories,
  previousOrder,
})(Customer);
