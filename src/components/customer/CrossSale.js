import React from "react";

// components
import CrossSaleItem from "./CrossSaleItem";

//state management
import { connect } from "react-redux";

const CrossSale = (props) => {
  const { menu } = props;
  return (
    <>
      {menu.map((item, index) => {
        if (item.category === "Cross Sale") {
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
