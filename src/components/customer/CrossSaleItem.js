import React from "react";

// components
import { Button } from "@material-ui/core";

// state management
import { connect } from "react-redux";
//actions
import { updateMenu } from "./../../actions/customer";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  item: {
    backgroundColor: "#e3e3e3",
    margin: ".3rem",
    padding: ".4rem .8rem",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Product-Sans",
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  counterContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  counter: {
    marginRight: ".4rem",
  },
});

const CrossSaleItem = (props) => {
  const { item, updateMenu } = props;
  let newItem = item;
  const addToCart = () => {
    if (item.normalCount !== undefined && item.jainCount !== undefined) {
      if (item.normalCount === 0 || item.jainCount === 0) {
        newItem.normalCount = 1;
        newItem.jainCount = 0;
        updateMenu(newItem);
      }
    }
    if (item.normalCount !== undefined && item.jainCount === undefined) {
      if (item.normalCount === 0) {
        newItem.normalCount = 1;
        updateMenu(newItem);
      }
    }
    if (item.normalCount === undefined && item.jainCount !== undefined) {
      if (item.jainCount === 0) {
        newItem.jainCount = 1;
        updateMenu(newItem);
      }
    }
  };

  const classes = useStyle();
  return (
    <div className={classes.item}>
      <div className={classes.title}>{item.name}</div>

      <div className={classes.counterContainer}>
        <Button variant="contained" color="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps, { updateMenu })(CrossSaleItem);
