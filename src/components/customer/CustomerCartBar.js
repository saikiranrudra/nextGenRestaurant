import React, { useState, useEffect } from "react";

// components
import { Paper, Button } from "@material-ui/core";

//state management
import { connect } from "react-redux";

//routing
import { Link } from "react-router-dom";

// icons
import { Send as SendIcon } from "@material-ui/icons";

//styling
import { makeStyles } from "@material-ui/core/styles";

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
  const [count, setCount] = useState(0);
  const { menu } = props;

  useEffect(() => {
    let calCount = 0;
    menu.forEach((item) => {
      if (item.normalCount > 0 || item.jainCount > 0) {
        calCount++;
      }
    });
    setCount(calCount);
  }, [menu]);

  return (
    <>
      {count > 0 ? (
        <Paper className={classes.card}>
          {count} Dish Selected{" "}
          <Link
            to={props.cr ? "/cr/orders" : "/customer/orders"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
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
          </Link>
        </Paper>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });

export default connect(mapStateToProps)(CutomerCartBar);
