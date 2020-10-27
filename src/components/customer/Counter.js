import React from "react";

//components
import { IconButton } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    width: "5.3rem",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "1.3rem",
    backgroundColor: "#d5d5d5",
    borderRadius: "4px",
  },
  box: {
    fontFamily: "Product-Sans",
    padding: "0 .3rem",
    "& > button": {
      padding: 0,
    },
  },
});
const Counter = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div
        onClick={() => {
          props.setCount(props.count + 1);
        }}
        style={{ borderRight: "1px solid #fff" }}
        className={classes.box}
      >
        <IconButton>+</IconButton>
      </div>
      <div className={classes.box}>{props.count}</div>
      <div
        onClick={() => {
          if (props.count > 0) {
            props.setCount(props.count - 1);
          }
        }}
        style={{ borderLeft: "1px solid #fff" }}
        className={classes.box}
      >
        <IconButton>-</IconButton>
      </div>
    </div>
  );
};

export default Counter;
