import React, { useEffect } from "react";

//Routing
import { Route } from "react-router-dom";

//pages
import TableSelect from "./../pages/CustomerRepresentative/TableSelect";
import Home from "./../pages/CustomerRepresentative/Home";
import OrderConfirm from "./../pages/CustomerRepresentative/OrderConfirm";
import PayBill from "./../pages/CustomerRepresentative/PayBill";
import ThankYou from "./../pages/CustomerRepresentative/ThankYou";
import Points from "./../pages/CustomerRepresentative/Points";
import Orders from "./../pages/CustomerRepresentative/Orders";

//state management
import { connect } from "react-redux";
// action
import { fetchMenuItems, fetchCategories } from "./../actions/customer";

const CustomerRepresentative = (props) => {
  const { fetchMenuItems, fetchCategories } = props;
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, [fetchMenuItems, fetchCategories]);
  return (
    <>
      <Route path="/cr/select/table" exact>
        <TableSelect />
      </Route>
      <Route path="/cr/home" exact>
        <Home />
      </Route>

      <Route path="/cr/orders" exact>
        <Orders />
      </Route>
      <Route path="/cr/orderconfirm" exact>
        <OrderConfirm />
      </Route>

      <Route path="/cr/paybill" exact>
        <PayBill />
      </Route>

      <Route path="/cr/payment/successfull" exact>
        <ThankYou />
      </Route>

      <Route path="/cr/points" exact>
        <Points />
      </Route>
    </>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {
  fetchMenuItems,
  fetchCategories,
})(CustomerRepresentative);
