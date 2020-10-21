import React from "react";

//Routing
import { Route } from "react-router-dom";

// stateManagement
import { connect } from "react-redux";

//Components
import KitchenProtect from "./../components/kitchen/KitchenProtect";

// pages
import Dashboard from "./../pages/Kitchen/Dashboard";

const Kitchen = (props) => {
  
  return (
    <>
      <Route path="/kitchen/dashboard" exact>
        <KitchenProtect>
          <Dashboard />
        </KitchenProtect>
      </Route>
    </>
  );
};
const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Kitchen);
