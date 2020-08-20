import React from "react";

// components
import { List, ListItem, ListItemText, Button } from "@material-ui/core";

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
const notificationsData = [
  {
    tableNo: 5,
    message: "Need Help",
  },
  {
    tableNo: 14,
    message: "Wants To pay bill",
    amount: 758,
    status: "recived",
  },
  {
    tableNo: 6,
    message: "Need Help",
  },
  {
    tableNo: 8,
    message: "Wants To pay bill",
    amount: 758,
    status: "recived",
  },
  {
    tableNo: 5,
    message: "Need Help",
  },
  {
    tableNo: 2,
    message: "Wants To pay bill",
    amount: 758,
    status: "recived",
  },
  {
    tableNo: 5,
    message: "Need Help",
  },
  {
    tableNo: 2,
    message: "Wants To pay bill",
    amount: 758,
    status: "recived",
  },
  {
    tableNo: 5,
    message: "Need Help",
  },
  {
    tableNo: 2,
    message: "Wants To pay bill",
    amount: 758,
    status: "recived",
  },
  {
    tableNo: 5,
    message: "Need Help",
  },
];

const Notifications = () => {
  const classes = useStyle();
  return (
    <div className={classes.notificationContainer}>
      <List>
        {notificationsData.map((notification, index) => {
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
                <span className={classes.red}>{notification.tableNo}</span>
              </ListItemText>

              <ListItemText className={classes.boldText}>
                <span>{notification.message}</span>
              </ListItemText>

              <ListItemText className={classes.boldText}>
                {notification.amount ? (
                  <span className={classes.red}>{notification.amount}₹</span>
                ) : null}
              </ListItemText>

              <ListItemText
                className={classes.boldText}
                style={{ color: notification.status ? "#fff" : null }}
              >
                {notification.status ? (
                  <Button variant="contained" className={classes.btn}>
                    {notification.status}
                  </Button>
                ) : null}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Notifications;
