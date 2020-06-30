import React from "react";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  btn: {
    backgroundColor: "#f5f5f5",
    padding: ".5rem .8rem",
    fontFamily: "Product-Sans",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3rem",
    fontSize: ".8rem",
    width: "13rem",
    outline: "none",
    border: "none",
    transition: "background-color .3s",
    "&:active": {
      backgroundColor: "#c3c3c3",
    },
  },
  google: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  btnText: {
    fontSize: ".9rem",
    marginLeft: ".5rem",
  },
});

const SignUpWithGoogle = () => {
  const classes = useStyle();
  return (
    <button className={classes.btn}>
      <span className={classes.google}>G</span>{" "}
      <span className={classes.btnText}>Sign up using google</span>
    </button>
  );
};

export default SignUpWithGoogle;
