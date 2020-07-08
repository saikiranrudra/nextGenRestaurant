import React from "react";

//state management
import { connect } from "react-redux";

// styles
import { makeStyles } from "@material-ui/core/styles";

// components
import OrderListItem from "./OrderListItem";

const useStyle = makeStyles({
  container: {
    margin: "1rem",
  },
});

const OrderList = (props) => {
  const classes = useStyle();
  const { menu } = props;

  return (
    <div className={classes.container}>
      {menu.map((item, index) => {
        if (item.normalCount > 0 || item.jainCount > 0) {
          return <OrderListItem key={index} item={item} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(OrderList);
