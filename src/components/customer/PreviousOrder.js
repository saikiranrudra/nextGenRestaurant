import React, {useEffect} from "react";

//state management
import { connect } from "react-redux";
//actions
import { updateMenuBulk, showPreviousOrder, previousOrder } from "./../../actions/customer";

//styling
import { makeStyles } from "@material-ui/core/styles";

// routing
import { useHistory } from "react-router-dom";

//components
import { Typography, Button } from "@material-ui/core";
import PreviousItem from "./PreviousItem";

//utils
// import _ from "lodash";

const useStyle = makeStyles({
  container: {
    backgroundColor: "#f5f5f5",
    padding: ".8rem .8rem .6rem .8rem",
  },
  heading: {
    fontFamily: "Product-Sans",
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "1rem 0",
  },
  btn: {
    margin: ".3rem",
    fontSize: ".6rem",
  },
});

const PreviousOrder = (props) => {
  const classes = useStyle();
  const history = useHistory();

  const {user, previousOrder} = props;

  useEffect(() => {
    if(user !== null) {
      previousOrder({email: user.email, token: user.token})
    }
  },[user, previousOrder])

  return (
    <>
      {props.previousOrderVisibility && props.previousOrders.length > 0 ? (
        <div className={classes.container}>
          <Typography variant="h3" className={classes.heading}>
            Want to take your last visit's order?
          </Typography>
          {props.previousOrders.map((item, index) => <PreviousItem key={index} item={item} /> )}
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.btn}
              onClick={() => {
                props.updateMenuBulk(props.previousOrders);
                props.showPreviousOrder(false);
                history.push(
                  props.ordersLink ? props.ordersLink : "/customer/orders"
                );
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.btn}
              onClick={() => {
                props.updateMenuBulk(props.previousOrders);
                props.showPreviousOrder(false);
              }}
            >
              I want to add more dishes
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.btn}
              onClick={() => {
                props.showPreviousOrder(false);
              }}
            >
              No
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ previousOrders, previousOrderVisibility, user }) => ({
  previousOrders,
  previousOrderVisibility,
  user
});

export default connect(mapStateToProps, {
  updateMenuBulk,
  showPreviousOrder,
  previousOrder
})(PreviousOrder);
