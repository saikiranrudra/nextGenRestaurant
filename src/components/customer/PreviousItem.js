import React, { useState } from "react";

//components
import { Typography } from "@material-ui/core";
import Counter from "./Counter";

//styling
import { makeStyles } from "@material-ui/core/styles";


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

const PreviousItem = ({item}) => {
  const classes = useStyle();
  const [jainCount, setJainCount] = useState(
    item.jainCount ? item.jainCount : 0
  );
  const [normalCount, setNormalCount] = useState(
    item.normalCount ? item.normalCount : 0
  );



  return (
    <div className={classes.container}>
      <Typography variant="h3" align="left" className={classes.itemName}>
        {item.name}
      </Typography>
      {item.normalCount !== undefined ? (
        <div>
          <span>Normal </span>
          <Counter count={normalCount} setCount={setNormalCount} />
        </div>
      ) : null}
      {item.jainCount !== undefined ? (
        <div>
          <span>Jain </span>
          <Counter count={jainCount} setCount={setJainCount} />
        </div>
      ) : null}
    </div>
  );
};

export default PreviousItem;
