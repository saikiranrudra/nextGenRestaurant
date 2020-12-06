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
//Actions
import {customerAuthenticate} from "./../../actions/customer";



//Utils
import {loadScript} from "./../../utils/functions";

//API
import axios from "axios";
//Variables
import {baseURL, paymentToken} from "./../../variables";

// Socket
import socket from "./../../socket";

// assets
import {logo} from "./../../assets/logo.png"

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
  if (item.normalCount !== undefined) {
    count += item.normalCount;
  } 
  
  if (item.jainCount !== undefined) {
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
    } 
    
    if (item.jainCount) {
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
  const [payOnline, setPayOnline] = useState("pay online");

  const handlePayOffline = async () => {

    try {
 
      const user = await axios.post(`${baseURL}/api/v1/users/updateUser`,{
        token: props.user.token,
        _id: props.user._id,
        points: !discount ? props.user.points : (props.user.points - discountCalc(props.user.points, props.app.pointValue).points)
      })

      props.customerAuthenticate(user.data.data);

      const res = await axios.post(`${baseURL}/api/v1/orders/myorders`, {
        email: props.user.email,
        token: props.user.token
      })

      const data =  await axios.post(`${baseURL}/api/v1/transection/createTransection`, {
        token: props.user.token,
        name: props.user.name,
        email: props.user.email,
        tableNo: props.tableNo,
        orders: res.data.original,
        total: totalPrice(res.data.data),

        payingAmount: !discount ? totalPrice(res.data.data) : (totalPrice(props.recivedOrders) *
        (1 - (discountCalc(props.user.points, props.app.pointValue).discountPercent/100))).toFixed(2),

        discountPercent: !discount ? 0 : (discountCalc(props.user.points, props.app.pointValue).discountPercent)
      })

      const notificationData = {
        type: "PAYBILL_OFFLINE",
        payload: data.data.data
      }  
      socket.emit("NOTIFICATION", notificationData);
      history.push("/customer/payment/successfull");
    
    } catch(err) {
      console.log(err);
    }
    

  }

  const handleOnlinePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    
    setPayOnline("please wait...");

    if(!res) {
      alert("internet connection issue online payment not working")
      return;
    }

    // const orderRes = await axios.post(`${baseURL}/api/v1/orders/myorders`, {
    //   email: props.user.email,
    //   token: props.user.token
    // })

    const data = await axios.post(`${baseURL}/api/v1/transection/payment`, {
      ...props.user,
      token: props.user.token,
      tableNo: props.tableNo
    });

    const options = {
      key: paymentToken, 
      currency: data.data.data.currency,
      amount: data.data.data.amount.toString(),
      order_id: data.data.data.id,
      name: props.app.name,
      description: `Payments for Orders at ${props.app.name}`,
      image: props.app.img ? `${baseURL}${props.app.img}` : logo,
      handler: function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature) {
            axios.post(`${baseURL}/api/v1/transection/confirmPayment`, {
              transectionId: data.data.data.transectionId,
              token: props.user.token,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
  
            }).then(res => {
              setPayOnline("pay online");
              // Making table vacant
              axios.post(`${baseURL}/api/v1/table/updateTable`, {
                _id: props.tableNo,
                isVacant: true
              }).then(() => {

                socket.emit("UPDATED_TABLES");
                history.push("/customer/payment/successfull");
              })
            }).catch(err => {
              console.log(err);
              alert("some thing went wrong");
            })  
          }
      },
      "prefill": {
          "name": props.user.name,
          "email": props.user.email
      },
      "notes": {
          "address": props.app.name
      },
      "theme": {
          "color": props.app.themeColor
      }
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    paymentObject.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata);
    });

    // paymentObject.on('payment.success', function(response) {
    //   alert("SUCCESS");
    // })
    setPayOnline("pay online");

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
          {props.app.state === "online" ?
            <Button
              variant="contained"
              color="primary"
              style={{ margin: ".3rem" }}
              onClick={handleOnlinePayment}
              disabled={payOnline.toLowerCase().includes("please wait") ? true : false }
            >
              {payOnline}
            </Button>
          : null }

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
  tables,
});
export default connect(mapStateToProps, {customerAuthenticate})(PayBill);
