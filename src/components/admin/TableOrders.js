import React from "react";

// Components
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@material-ui/core";

// icons
import edit from "./../..//assets/dashboardAssets/edit.svg";

// Tempimages
import c1 from "./../../assets/catogery/c1 (1).png";
import c2 from "./../../assets/catogery/c1 (2).png";
import c3 from "./../../assets/catogery/c1 (3).png";
import c4 from "./../../assets/catogery/c1 (4).png";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  red: {
    color: theme.palette.primary.main,
  },
}));

//temp data
let preparing = [
  {
    id: "123abc",
    img: c1,
    name: "Risotto",
    category: "Punjabi",
    rating: 4,
    mealFor: 2,
    price: 125,
    jainCount: 7,
    normalCount: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "456def",
    img: c2,
    name: "PanCake",
    category: "Punjabi Bread",
    rating: 3,
    mealFor: 2,
    price: 25,
    jainCount: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
  {
    id: "789ghi",
    img: c3,
    name: "Manchurian",
    category: "Chines Food",
    rating: 1,
    mealFor: 1,
    price: 100,
    normalCount: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sem odio. Donec auctor tincidunt convallis. Vivamus tincidunt hendrerit nisi. Aenean at dui quis tortor aliquam consequat ac nec leo. Suspendisse sagittis elit eget lacinia iaculis. Etiam pharetra, lorem ut consectetur porta",
  },
];

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
const TableOrders = () => {
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
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Orders
        </Typography>
        <Button
          variant="contained"
          endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
        >
          Edit
        </Button>
      </div>

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

      <Table>
        <TableHead>
          <TableRow>
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
          {preparing.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.jainCount ? item.jainCount : 0}</TableCell>
                <TableCell>{item.normalCount ? item.normalCount : 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Served</b>
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
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.jainCount ? item.jainCount : 0}</TableCell>
                <TableCell>{item.normalCount ? item.normalCount : 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableOrders;
