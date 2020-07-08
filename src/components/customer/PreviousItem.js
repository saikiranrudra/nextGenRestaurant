import React, { useState } from "react";
//styling
import { makeStyles } from "@material-ui/core/styles";

//components
import { Typography } from "@material-ui/core";
import Counter from "./Counter";

const useStyle = makeStyles({
  itemName: {
    fontSize: "1rem",
  },
  container: {
    fontFamily: "Product-Sans",
    backgroundColor: "#fff",
    padding: ".4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: ".3rem",
  },
});

const PreviousItem = ({ order }) => {
  const [jainCount, setJainCount] = useState(
    order.jainCount ? order.jainCount : 0
  );
  const [normalCount, setNormalCount] = useState(
    order.normalCount ? order.normalCount : 0
  );
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Typography variant="h3" align="left" className={classes.itemName}>
        {order.name}
      </Typography>
      {order.normalCount !== undefined ? (
        <div>
          <span>Normal </span>
          <Counter count={normalCount} setCount={setNormalCount} />
        </div>
      ) : null}
      {order.jainCount !== undefined ? (
        <div>
          <span>Jain </span>
          <Counter count={jainCount} setCount={setJainCount} />
        </div>
      ) : null}
    </div>
  );
};

export default PreviousItem;
