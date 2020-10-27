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

//API 
import axios from "axios";
//Variables
import {baseURL} from "./../../variables";

//utils
import {getTableNo} from "./../../utils/functions";

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

// const calcCount = (item) => {
//   if (item.normalCount && item.jainCount) {
//     return item.normalCount + item.jainCount;
//   } else if (item.normalCount) {
//     return item.normalCount;
//   } else if (item.jainCount) {
//     return item.jainCount;
//   } else {
//     return 0;
//   }
// };


const TableContainer = (props) => {
  const classes = useStyle();
  const { data } = props;

  const handleDoneAll = (order) => {
    axios.post(`${baseURL}/api/v1/orders/markOrderCooked`, {_id: order._id})
      .then(res => {
        props.fetchOrders();
        props.calcOrderServed();
      }).catch(err => {
        console.log(err);
        alert(err);
      })
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h6" align="center" className={classes.heading}>
        Table <span className={classes.tableNo}>{getTableNo(props.tables ,data.tableNo)}</span>
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
                {item.normalCount !== undefined ? `${item.normalCount}(Normal)` : null}{" "}
                {item.jainCount !== undefined ? `${item.jainCount}(Jain)` : null}
              </TableCell>

              {/* <TableCell>
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
              </TableCell> */}
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
            handleDoneAll(data);
          }}
        >
          Done All
        </Button>
      </center>
    </Paper>
  );
};

const mapStateToProps = ({ tables }) => ({ tables });

export default connect(mapStateToProps)(TableContainer);
