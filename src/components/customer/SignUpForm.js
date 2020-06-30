import React from "react";
import { Typography } from "@material-ui/core";

const SignUpForm = (props) => {
  return (
    <>
      <Typography variant="h6" align="center">
        Please Log in for your order
      </Typography>
      <input
        type="text"
        value={props.data.name}
        onChange={(el) => {
          setData({ ...props.data, name: el.target.value });
        }}
        placeholder="Enter your Name"
      />
      <input
        type="email"
        value={props.data.email}
        onChange={(el) => {
          setData({ ...props.data, email: el.target.value });
        }}
        placeholder="Enter your Email"
      />
      <input
        type="number"
        value={props.data.phoneNo}
        onChange={(el) => {
          setData({ ...props.data, phoneNo: el.target.value });
        }}
        placeholder="Enter your Phone Number"
      />
      <input
        type="date"
        value={props.data.birthDate}
        onChange={(el) => {
          setData({ ...props.data, birthDate: el.target.value });
        }}
        placeholder="Enter your birth date"
      />
    </>
  );
};

export default SignUpForm;
