import React, { useState } from "react";

//components
import { Paper } from "@material-ui/core";

// images
import logo from "./../../assets/logo.png";

const TopLogo = () => {
  const [visible, setVisible] = useState(window.scrollY === 0 ? true : false);
  window.addEventListener("scroll", (e) => {
    if (window.scrollY === 0) {
      if (visible === false) {
        setVisible(true);
      }
    } else {
      if (visible === true) {
        setVisible(false);
      }
    }
  });
  return (
    <Paper
      style={{
        position: "fixed",
        zIndex: 1300,
        top: 0,
        width: "100%",
        transition: "all .4s",
        backgroundColor: !visible ? "#fff" : "rgba(225,225,225,0)",
        boxShadow: !visible
          ? "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
          : "none",
      }}
    >
      <img
        style={{ margin: ".8rem 1rem", width: "8rem" }}
        src={logo}
        alt="logo"
      />
    </Paper>
  );
};

export default TopLogo;
