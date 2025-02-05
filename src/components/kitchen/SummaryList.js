import React from "react";

//Components
import { ListItem, ListItemText, List, Typography } from "@material-ui/core";

//styling
import { makeStyles } from "@material-ui/core/styles";

//stateManagement
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  pendingCount: {
    color: theme.palette.primary.main,
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "5rem",
  },
  countContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "2rem",
  },
}));

const calcCount = (item) => {
  if (item.normalCount && item.jainCount) {
    return item.normalCount + item.jainCount;
  } else if (item.normalCount) {
    return item.normalCount;
  } else if (item.jainCount) {
    return item.jainCount;
  } else {
    return 0;
  }
};

const genData = (orders) => {
  let data = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (data[item._id] === undefined) {
        data[item._id] = {
          name: item.name,
          count: calcCount(item)
        }
      } else {
        data[item._id].count += calcCount(item) 
      }
    });
  });

  return data;
};

const SummaryList = (props) => {
  const classes = useStyle();
  const data = genData(props.orders);
  
  return (
    <>
      <List>
        {Object.entries(data).map((item, index) => (
          <ListItem key={index}>
            <ListItemText>{item[1].name}</ListItemText>
            <ListItemText style={{ textAlign: "end" }}>
              {item[1].count}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      <div className={classes.countContainer}>
        <div>
          <Typography
            variant="h6"
            align="center"
            className={classes.pendingCount}
            style={{ fontSize: "7rem" }}
          >
            {props.orders.length}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Orders pending
          </Typography>
        </div>

        <div>
          <Typography
            variant="h6"
            align="center"
            className={classes.pendingCount}
          >
            {props.orderServed}
          </Typography>
          <Typography variant="body1" align="center">
            Orders Served
          </Typography>
        </div>
      </div>
    </>
  );
};

const mapStatToProps = () => ({});
export default connect(mapStatToProps)(SummaryList);
