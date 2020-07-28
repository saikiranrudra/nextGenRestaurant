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
            <TableRow key={index}>
              <TableCell>
                Table{" "}
                <span className={classes.red}>{notification.tableNo}</span>
              </TableCell>

              <TableCell>
                <span>{notification.message}</span>
              </TableCell>

              <TableCell>
                {notification.amount ? (
                  <span className={classes.red}>{notification.amount}₹</span>
                ) : null}
              </TableCell>

              <TableCell>
                {notification.status ? (
                  <Button variant="contained" color="primary">
                    {notification.status}
                  </Button>
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
