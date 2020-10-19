import React, {useState} from "react";

// Components
import TopLogo from "./../../components/general/TopLogo";
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  FormControlLabel,
  Checkbox,
  TableCell,
  Button
} from "@material-ui/core";
import NeedHelp from "./../../components/customer/NeedHelp";
import Navigation from "./../../components/customer/Navigation";

// Routing
import { Link, useHistory } from "react-router-dom";

// State Management
import { connect } from "react-redux";

// Socket
import socket from "./../../socket";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    marginTop: "4rem",
  },
  heading: {
    textAlign: "left",
    marginTop: "5rem",
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "2rem",
    marginLeft: "1rem",
  },
  subHeading: {
    fontFamily: "Product-Sans",
    marginLeft: "1rem",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  itemText: {
    fontFamily: "Product-Sans",
    fontWeight: "normal",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const individualPrice = (item) => {
  let count = 0;
  if (item.normalCount) {
    count += item.normalCount;
  } else if (item.jainCount) {
    count += item.jainCount;
  }

  return count * item.price;
};

const totalCount = (item) => {
  let count = 0;
  if (item.normalCount) {
    count += item.normalCount;
  } else if (item.jainCount) {
    count += item.jainCount;
  }
  return count;
};

const totalPrice = (items) => {
  let total = 0,
    count;
  items.forEach((item) => {
    count = 0;
    // count item
    if (item.normalCount) {
      count += item.normalCount;
    } else if (item.jainCount) {
      count += item.jainCount;
    }

    // add it to total
    total += count * item.price;
  });

  return total;
};

const discountCalc = (userPoints, pointValue) => {
  if (userPoints <= 0) {
    return {discountPercent: 0, points: 0};
  } else if(userPoints < pointValue.redeemLimit){
    return {discountPercent: 0.05*userPoints, points: userPoints};
  } else {
    return {discountPercent: 0.05*pointValue.redeemLimit, points: pointValue.redeemLimit};
  }
};

const PayBill = (props) => {
  const classes = useStyle();
  const [discount, setDiscount] = useState(false);
  const history = useHistory();

  const handlePayOffline = () => {
    let payload = {}
    props.tables.forEach(table => {
      if(table._id === props.tableNo) {
        payload["tableNo"] = table.tableNo;
      }
    })
    payload["tableId"] = props.tableNo;

    payload["discountPoints"] = !discount ? 0 : props.user && props.app.pointValue ?
    discountCalc(props.user.points, props.app.pointValue)["points"] : 0
    
    
    payload["total"] =  !discount
      ? totalPrice(props.recivedOrders)
      : props.user && props.app.pointValue
      ? 
          (totalPrice(props.recivedOrders) *
          (1 - (discountCalc(props.user.points, props.app.pointValue).discountPercent/100))).toFixed(2)
        
      : totalPrice(props.recivedOrders)

    const data = {
      type: "PAYBILL_OFFLINE",
      payload
    }  
    socket.emit("NOTIFICATION", data);

    history.push("/customer/payment/successfull");

  }

  const handleChange = (event) => {
    setDiscount(event.target.checked);
  };

  return (
    <>
      <TopLogo />
      <div className={classes.container}>
        <Typography variant="h5" align="left" className={classes.heading}>
          Pay My Bill
        </Typography>
        <Typography variant="body1" align="left" className={classes.subHeading}>
          Total Dishes {props.recivedOrders.length}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.recivedOrders.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{totalCount(item)}</TableCell>
                  <TableCell>{individualPrice(item)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="body1"
          align="right"
          className={classes.subHeading}
          style={{ marginRight: "1rem" }}
        >
          <span style={{ fontWeight: "normal" }}>Your Total Bill is </span>
          <span style={{ fontWeight: "bold" }}>
            {totalPrice(props.recivedOrders)}₹
          </span>
        </Typography>

        <Typography
          variant="body1"
          align="right"
          className={classes.subHeading}
          style={{ marginRight: "1rem" }}
        >
          <span style={{ fontWeight: "normal" }}>You have </span>
          <span style={{ fontWeight: "bold" }}>
            {props.user ? props.user.points : 0}
          </span>
          <span style={{ fontWeight: "normal" }}> Discount Points</span>
        </Typography>
        <Typography align="right">
          <FormControlLabel
            control={
              <Checkbox
                checked={discount}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            style={{ fontFamily: "Product-Sans" }}
            label="Redeem My Discount Points"
          />
        </Typography>

        <Typography
          variant="body1"
          align="right"
          className={classes.subHeading}
          style={{ marginRight: "1rem", fontFamily: "Product-Sans" }}
        >
          Discount Points{" "}
          {props.user && props.app.pointValue && discount
            ? `- ${discountCalc(props.user.points, props.app.pointValue).discountPercent}%`
            : "0%"}
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <hr
            style={{
              display: "inline-block",
              width: "56%",
              margin: 0,
              height: ".3rem",
              backgroundColor: "#3a3a3a",
              borderRadius: ".8rem",
              marginRight: "1rem",
              marginTop: ".8rem",
            }}
          />
        </div>
        <Typography
          align="right"
          style={{
            marginRight: "1rem",
            fontFamily: "Product-Sans",
            marginTop: ".6rem",
            fontSize: "4rem",
            fontWeight: "bold",
          }}
        >
          {!discount
            ? `${totalPrice(props.recivedOrders)}`
            : props.user && props.app.pointValue
            ? `${(
                totalPrice(props.recivedOrders) *
                (1 - (discountCalc(props.user.points, props.app.pointValue).discountPercent/100))).toFixed(2)
              }`
            : `${totalPrice(props.recivedOrders)}`}
          <span style={{ fontSize: "1.8rem" }}>₹</span>
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "1rem",
            marginBottom: "5rem"
          }}
        >
          <Link to="/customer/payment/successfull" className={classes.link}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: ".3rem" }}
            >
              Pay Online
            </Button>
          </Link>

          <Button
            variant="contained"
            color="primary"
            style={{ margin: ".3rem" }}
            onClick={handlePayOffline}
          >
            Pay Offline
          </Button>
        </div>
      </div>

      <Navigation>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <NeedHelp />
          <Link
            to="/customer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button variant="contained" color="primary">
              Menu
            </Button>
          </Link>
        </div>
      </Navigation>
    </>
  );
};
const mapStateToProps = ({ recivedOrders, user, app, tableNo, tables }) => ({
  recivedOrders,
  user,
  app,
  tableNo,
  tables
});
export default connect(mapStateToProps)(PayBill);
