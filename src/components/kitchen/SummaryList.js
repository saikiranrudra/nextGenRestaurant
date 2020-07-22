import React from "react";

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

const calcTotalCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    count += item[1].count;
  });

  return count;
};

const genData = (kitchenOrders) => {
  let data = {};

  kitchenOrders.forEach((table) => {
    table.items.forEach((item) => {
      if (item.isCooked === false) {
        if (data[item.id] === undefined) {
          data[item.id] = {
            name: item.name,
            count: calcCount(item),
          };
        } else {
          data[item.id].count = data[item.id].count + calcCount(item);
        }
      }
    });
  });

  return data;
};

const SummaryList = (props) => {
  const classes = useStyle();
  const data = genData(props.data);

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
            {calcTotalCount(Object.entries(data))}
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

const mapStatToProps = ({ orderServed }) => ({ orderServed });
export default connect(mapStatToProps)(SummaryList);
