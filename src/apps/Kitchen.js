import React, { useEffect } from "react";

//Routing
import { Route } from "react-router-dom";

// stateManagement
import { connect } from "react-redux";

// actions
import { fetchKitchenOrders } from "./../actions/kitchen";

// pages
import Dashboard from "./../pages/Kitchen/Dashboard";

const Kitchen = (props) => {
  const { fetchKitchenOrders } = props;
  useEffect(() => {
    fetchKitchenOrders();
  }, [fetchKitchenOrders]);
  return (
    <>
      <Route path="/kitchen/dashboard" exact>
        <Dashboard />
      </Route>
    </>
  );
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps, { fetchKitchenOrders })(Kitchen);
