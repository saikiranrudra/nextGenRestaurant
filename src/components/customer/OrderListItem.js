import React, { useState, useEffect } from "react";

// components
import Counter from "./Counter";

// styles
import { makeStyles } from "@material-ui/core/styles";

//actions
import { updateMenu } from "./../../actions/customer";

import { connect } from "react-redux";

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

const OrderListItem = (props) => {
  const { item, updateMenu } = props;
  const [jainCount, setJainCount] = useState(
    item.jainCount !== undefined ? item.jainCount : 0
  );
  const [normalCount, setNormalCount] = useState(
    item.normalCount !== undefined ? item.normalCount : 0
  );

  useEffect(() => {
    setNormalCount(item.normalCount !== undefined ? item.normalCount : 0);
    setJainCount(item.jainCount !== undefined ? item.jainCount : 0);
  }, [item]);

  useEffect(() => {
    if (item.normalCount !== undefined && item.jainCount !== undefined) {
      item.normalCount = normalCount;
      item.jainCount = jainCount;
      updateMenu(item);
    }
    if (item.normalCount !== undefined && item.jainCount === undefined) {
      item.normalCount = normalCount;
      updateMenu(item);
    }
    if (item.normalCount === undefined && item.jainCount !== undefined) {
      item.jainCount = jainCount;
      updateMenu(item);
    }
  }, [updateMenu, item, jainCount, normalCount]);

  const classes = useStyle();
  return (
    <div className={classes.item}>
      <div className={classes.title}>{item.name}</div>

      <div className={classes.counterContainer}>
        {item.normalCount !== undefined ? (
          <div className={classes.counter}>
            <span>Normal </span>
            <Counter count={normalCount} setCount={setNormalCount} />
          </div>
        ) : null}

        {item.jainCount !== undefined ? (
          <div className={classes.counter}>
            <span>Jain </span>
            <Counter count={jainCount} setCount={setJainCount} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps, { updateMenu })(OrderListItem);
