import React from "react";
import { Paper } from "@material-ui/core";

const Navigation = (props) => {
  return (
    <Paper
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        padding: ".8rem",
      }}
    >
      {props.children}
    </Paper>
  );
};

export default Navigation;
