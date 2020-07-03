import React from "react";

// components
import { Paper, Button } from "@material-ui/core";

//state management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";
import { Send as SendIcon } from "@material-ui/icons";
const useStyle = makeStyles((theme) => ({
  card: {
    position: "fixed",
    bottom: "5rem",
    width: "95%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.primary.main,
    color: "#fafafa",
    fontFamily: "Product-Sans",
    fontSize: "1.2rem",
    textAlign: "center",
    padding: ".7rem 0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const CutomerCartBar = (props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.card}>
      {props.cart.length} Dish Selected{" "}
      <Button
        style={{
          marginLeft: "1rem",
          backgroundColor: "#fff",
          fontFamily: "Product-Sans",
        }}
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
      >
        View Orders
      </Button>
    </Paper>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps)(CutomerCartBar);
