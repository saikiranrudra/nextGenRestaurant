import React, { useEffect } from "react";

// pages
import Auth from "./../pages/customer/Auth";
import NeedHelp from "./../pages/customer/NeedHelp";
import SignUp from "./../pages/customer/SignUp";
import Home from "./../pages/customer/Home";

//routing
import { Route } from "react-router-dom";
import CustomerProtect from "./../components/customer/CustomerProtect";

//state management
import { connect } from "react-redux";
//actions
import { fetchMenuItems, fetchCategories } from "./../actions/customer";
// component

const Customer = (props) => {
  const fetchMenuItems = props.fetchMenuItems;
  const fetchCategories = props.fetchCategories;
  // fetch menu
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, [fetchMenuItems, fetchCategories]);

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
    </>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { fetchMenuItems, fetchCategories })(
  Customer
);
