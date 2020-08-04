import React from "react";

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

// Tempimages
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

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

let served = [
  {
    id: "789ghi",
    img: c3,
    name: "Manchurian",
    category: "Chines Food",
    rating: 1,
    mealFor: 1,
    price: 100,
    normalCount: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112jkl",
    img: c4,
    name: "Rice",
    category: "South Indian",
    rating: 4,
    mealFor: 3,
    price: 120,
    jainCount: 6,
    normalCount: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross1",
    img: c4,
    name: "Coke",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
    normalCount: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross2",
    img: c4,
    name: "Butter Milk",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
    normalCount: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "101112cross3",
    img: c4,
    name: "papaad",
    category: "Cross Sale",
    rating: 4,
    mealFor: 3,
    price: 120,
    normalCount: 7,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
];

const ShowAndPrintBill = () => {
  const classes = useStyle();
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
            1
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
            {served.map((item, index) => {
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
          >
            Print Bill
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowAndPrintBill;
