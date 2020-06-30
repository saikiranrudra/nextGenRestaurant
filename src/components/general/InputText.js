import React from "react";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  input: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: ".9rem",
    outline: "none",
    border: "none",
    backgroundColor: "#f5f5f5",
    padding: ".5rem .8rem",
    borderRadius: "1rem",
    width: "13rem",
    textAlign: "center",
    transition: "all .3s",
    "&:focus": {
      width: "13rem",
    },
  },
});

const InputText = (props) => {
  const classes = useStyle();
  if (props.type === "text") {
    return (
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
        className={classes.input}
      />
    );
  } else if (props.type === "email") {
    return (
      <input
        type="email"
        placeholder={props.placeholder}
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
        className={classes.input}
      />
    );
  }
};

InputText.defaultProps = {
  placeholder: "Enter the text",
  text: "",
  type: "text",
};

export default InputText;
