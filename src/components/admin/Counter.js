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

const handleCount = (type, data, setData, count, itemId) => {
  let newData = data;

  //find index
  let index = -1;
  newData.forEach((item, i) => {
    if (item.id === itemId) {
      index = i;
    }
  });

  //inc or dec by 1 based on type
  if (index !== -1) {
    if (type === "increment") {
      if (count.normalCount) {
        newData[index].normalCount = newData[index].normalCount + 1;
      }

      if (count.jainCount) {
        newData[index].jainCount = newData[index].jainCount + 1;
      }
    }
    if (type === "decrement") {
      if (count.normalCount) {
        newData[index].normalCount = newData[index].normalCount - 1;
      }

      if (count.jainCount) {
        newData[index].jainCount = newData[index].jainCount - 1;
      }
    }
  }

  //set state
  setData([...newData]);
};

const Counter = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div
        onClick={() => {
          let count = {
            normalCount: props.normalCount ? props.normalCount : null,
            jainCount: props.jainCount ? props.jainCount : null,
          };
          handleCount(
            "increment",
            props.data,
            props.setData,
            count,
            props.itemId
          );
        }}
        style={{ borderRight: "1px solid #fff" }}
        className={classes.box}
      >
        <IconButton>+</IconButton>
      </div>
      <div className={classes.box}>
        {props.normalCount ? props.normalCount : props.jainCount}
      </div>
      <div
        onClick={() => {
          let count = {
            normalCount: props.normalCount ? props.normalCount : null,
            jainCount: props.jainCount ? props.jainCount : null,
          };
          if (props.normalCount > 0 || props.jainCount > 0) {
            handleCount(
              "decrement",
              props.data,
              props.setData,
              count,
              props.itemId
            );
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
