import React from "react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";

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
    <Table style={{ backgroundColor: "#F5F5F5" }}>
      <TableBody>
        {notificationsData.map((notification, index) => {
          return (
            <TableRow
              key={index}
              style={{
                backgroundColor: notification.status ? "#FC6565" : null,
              }}
            >
              <TableCell
                className={classes.boldText}
                style={{ color: notification.status ? "#fff" : null }}
              >
                Table{" "}
                <span
                  className={classes.red}
                  style={{ color: notification.status ? "#fff" : null }}
                >
                  {notification.tableNo}
                </span>
              </TableCell>

              <TableCell
                className={classes.boldText}
                style={{ color: notification.status ? "#fff" : null }}
              >
                <span>{notification.message}</span>
              </TableCell>

              <TableCell className={classes.boldText}>
                {notification.amount ? (
                  <span
                    style={{ color: notification.status ? "#fff" : null }}
                    className={classes.red}
                  >
                    {notification.amount}₹
                  </span>
                ) : null}
              </TableCell>

              <TableCell
                className={classes.boldText}
                style={{ color: notification.status ? "#fff" : null }}
              >
                {notification.status ? (
                  <Button variant="contained">{notification.status}</Button>
                ) : null}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Notifications;
