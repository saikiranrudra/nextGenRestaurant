import React, {useState, useEffect} from "react";

//components
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from "@material-ui/core";

//utils
import {getTableNo, getItemsFromOrders} from "./../../utils/functions";

 
// State Management
import {connect} from "react-redux";
//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  red: {
    color: theme.palette.primary.main,
  },
  totalPrice: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    margin: "1rem",
  },
  head: {
    "& > th": {
      fontFamily: "Product-Sans",
      color: "#989898",
      fontSize: ".8rem",
    },
  },
  tableBody: {
    "& > td": {
      fontFamily: "Product-Sans",
      fontWeight: "bold",
      backgroundColor: "#fff",
    },
  },
}));


const ShowAndPrintBill = (props) => {
  const classes = useStyle();
  const [items, setItems] = useState(getItemsFromOrders(props.selectedOrder.orders));

  useEffect(() => {
    setItems(getItemsFromOrders(props.selectedOrder.orders))
  },[props.selectedOrder])

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            fontStyle: "normal",
            lineHeight: "0.6",
          }}
        >
          Orders
        </Typography>
      </div>

      <div
        style={{
          backgroundColor: "#F5F5F5",
          paddingBottom: "1rem",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: "#D9D9D9",
            padding: ".3rem .4rem",
            borderRadius: "4px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Table</span>{" "}
          <span className={classes.red} style={{ fontWeight: "bold" }}>
            {getTableNo(props.tables, props.selectedOrder.tableNo)}
          </span>
        </div>

        <Table style={{ margin: "0 1rem 1rem 1rem", width: "auto" }}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell>
                <b>Preparing</b>
              </TableCell>
              <TableCell>
                <b>Jain</b>
              </TableCell>
              <TableCell>
                <b>Normal</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => {
              return (
                <TableRow key={index} className={classes.tableBody}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.jainCount ? item.jainCount : 0}</TableCell>
                  <TableCell>
                    {item.normalCount ? item.normalCount : 0}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div style={{ textAlign: "end", margin: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              fontFamily: "Product-Sans",
              fontWeight: "bold",
              fontSize: ".8rem",
            }}
            disabled={items.length > 0 ? false : true}
          >
            Print Bill
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({tables}) => ({tables});

export default connect(mapStateToProps)(ShowAndPrintBill);
