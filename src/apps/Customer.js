import React from "react";

// pages
import Auth from "../pages/customer/Auth";

//routing
import { Route } from "react-router-dom";

/**
 * Customer App Component
 *
 * @component
 *
 * @example
 * return (
 *  <Customer />
 * )
 */

const Customer = () => {
  return (
    <Route path="/customer/">
      <Auth />
    </Route>
  );
};

export default Customer;
