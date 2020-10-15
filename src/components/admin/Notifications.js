import React from "react";

// components
import { List, ListItem, ListItemText, Button } from "@material-ui/core";

// State Management
import {connect} from "react-redux";

// Utils
import _ from "lodash";

// API
import axios from "axios";
//Variables
import {baseURL} from "./../../variables";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  red: {
    fontFamily: "Product-Sans",
    color: theme.palette.primary.main,
  },
  boldText: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontFamily: "Product-Sans",
    fontWeight: "bold",
  },
  notificationContainer: {
    overflowX: "hidden",
    overflowY: "scroll",
    height: "81.5vh",
    backgroundColor: "#F5F5F5",
    borderRadius: "5px",
    marginTop: "1.2rem",
  },
}));



const Notifications = (props) => {
  const classes = useStyle();

  const handleRecived = (notification) => {
    axios.post(`${baseURL}/api/v1/orders/markPayedByTableNo`, {
      token: props.staff.token,
      tableNo: notification.payload.tableId
    }).then(res => {
      let notifications = _.clone(props.notificationsData);

       _.remove(
        notifications, (n) => n.type === "PAYBILL_OFFLINE" && n.payload.tableId === notification.payload.tableId
      )

      props.setNotifications(notifications)
    }).catch(err => {
      console.log(err);
      alert(err);
    })
  }
 
  return (
    <div className={classes.notificationContainer}>
      <List>
        {props.notificationsData.map((notification, index) => {
          if(notification.type === "NEED_HELP") {
        
            return (
              <ListItem
                key={index}
                style={{
                  margin: ".6rem .5rem",
                  width: "auto",
                  backgroundColor: "#fff",
                }}
              >
                <ListItemText className={classes.boldText}>
                  Table{" "}
                  <span className={classes.red}>{notification.payload.tableNo}</span>
                </ListItemText>
    
                  <ListItemText className={classes.boldText}>
                    <span>Need Help</span>
                  </ListItemText>
              </ListItem>
            );
          } else if(notification.type === "PAYBILL_OFFLINE") {
            return (
              <ListItem
              key={index}
              style={{
                margin: ".6rem .5rem",
                width: "auto",
                backgroundColor: "#fff",
              }}
            >
              <ListItemText className={classes.boldText}>
                Table{" "}
                <span className={classes.red}>{notification.payload.tableNo}</span>
              </ListItemText>

              <ListItemText className={classes.boldText}>
                <span>Wants to pay bill</span>
              </ListItemText>

              <ListItemText className={classes.boldText}>
                <span className={classes.red}>{notification.payload.total}₹</span>
              </ListItemText>

              <ListItemText
                className={classes.boldText}
                style={{ color: notification.status ? "#fff" : null }}
              >           
                <Button 
                  variant="contained" 
                  className={classes.btn}
                  onClick={() => { handleRecived(notification) }}
                >
                  Recived
                </Button>
              </ListItemText>
            </ListItem>
            )
          } else {
            return null;
          }
        })}
      </List>
    </div>
  );
};

const mapStateToProps = ({staff}) => ({staff}); 
export default connect(mapStateToProps)(Notifications);