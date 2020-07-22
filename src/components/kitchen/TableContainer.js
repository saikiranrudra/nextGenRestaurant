import React from "react";

//components
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";

//State Management
import { connect } from "react-redux";
//Action
import {
  markKitchenOrderDone,
  incrementOrderServed,
  deleteTableOrder,
} from "./../../actions/kitchen";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  tableNo: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontFamily: "Product-Sans",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  comment: {
    "& > p": {
      margin: 0,
    },
    "& > input": {
      width: "100%",
      fontFamily: "Product-Sans",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  },
  container: {
    padding: "1rem",
    borderRadius: "1.4rem",
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

const handleDone = (
  item,
  tableNo,
  markKitchenOrderDone,
  incrementOrderServed
) => {
  // handle item

  incrementOrderServed(calcCount(item));
  markKitchenOrderDone({ item, tableNo });
};

const handleDoneAll = (data, deleteTableOrder, incrementOrderServed) => {
  data.items.forEach((item) => {
    incrementOrderServed(calcCount(item));
    deleteTableOrder(data.tableNo);
  });
};

const TableContainer = (props) => {
  const classes = useStyle();
  const { data } = props;
  return (
    <Paper className={classes.container}>
      <Typography variant="h6" align="center" className={classes.heading}>
        Table <span className={classes.tableNo}>{data.tableNo}</span>
      </Typography>
      <div className={classes.comment}>
        <p>Comment</p>
        <input type="text" defaultValue={data.comment} readOnly />
      </div>

      <Table>
        <TableBody>
          {data.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>

              <TableCell>
                {item.normalCount ? `${item.normalCount}(Normal)` : null}{" "}
                {item.jainCount ? `${item.jainCount}(Jain)` : null}
              </TableCell>

              <TableCell>
                {item.isCooked ? (
                  <Button
                    disabled
                    variant="contained"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Complete
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => {
                      handleDone(
                        item,
                        data.tableNo,
                        props.markKitchenOrderDone,
                        props.incrementOrderServed
                      );
                    }}
                  >
                    Done
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <center style={{ margin: "1.4rem" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: ".7rem " }}
          onClick={() => {
            handleDoneAll(
              data,
              props.deleteTableOrder,
              props.incrementOrderServed
            );
          }}
        >
          Done All
        </Button>
      </center>
    </Paper>
  );
};

const mapStateToProps = ({ kitchenOrders }) => ({ kitchenOrders });

export default connect(mapStateToProps, {
  markKitchenOrderDone,
  incrementOrderServed,
  deleteTableOrder,
})(TableContainer);
