import React from "react";

//styling
import { makeStyles } from "@material-ui/core/styles";

// actions
import { loginWithEmail } from "./../../actions/general/login";

//state management
import { connect } from "react-redux";

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

const EmailTextField = (props) => {
  const classes = useStyle();
  return (
    <input
      type="email"
      placeholder={props.placeholder}
      onChange={(e) => props.loginWithEmail(e.target.value)}
      value={props.email}
      className={classes.input}
    />
  );
};

EmailTextField.defaultProps = {
  placeholder: "Enter the Email",
};

const mapStateToProps = ({ email }) => ({
  email,
});
export default connect(mapStateToProps, { loginWithEmail })(EmailTextField);
