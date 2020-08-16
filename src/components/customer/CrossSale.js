import React from "react";

// components
import CrossSaleItem from "./CrossSaleItem";

// utils
import _ from "lodash";

//state management
import { connect } from "react-redux";

const CrossSale = (props) => {
  const { menu } = props;
  return (
    <>
      {menu.map((item, index) => {
        if (
          _.some(item.category, { name: "Cross Sale" }) &&
          item.visible === true
        ) {
          return <CrossSaleItem key={index} item={item} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });
export default connect(mapStateToProps)(CrossSale);
