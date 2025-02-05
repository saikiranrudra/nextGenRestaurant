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

//API
import axios from "axios";
// Variables
import {baseURL} from "./../../variables";
 
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
  const [printBtnText, setPrintBtnText] = useState("Print Bill");

  useEffect(() => {
    setItems(getItemsFromOrders(props.selectedOrder.orders))
  },[props.selectedOrder])

  const printBill = () => {
    setPrintBtnText("Please Wait...");
    axios.post(`${baseURL}/api/v1/transection/downloadBill`, {
      token: props.staff.token,
      transection: props.selectedOrder
    }).then(res => {
      // fileDownload(res.data, `${props.selectedOrder._id}.pdf`);
      console.log(res);
      // console.log(typeof(res));
      setPrintBtnText("Print Bill");
    }).catch(err => {
      console.log(err);
      setPrintBtnText("Print Bill");
    })
  }

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
            disabled={items.length <= 0 || printBtnText.toLocaleUpperCase().includes("please wait") 
              ? true : false}
            onClick={printBill}
          >
            {printBtnText}
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({tables, staff}) => ({tables, staff});

export default connect(mapStateToProps)(ShowAndPrintBill);
