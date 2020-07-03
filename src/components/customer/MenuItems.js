import React from "react";

// Components
import ItemCard from "./ItemCard";
import CustomerCartBar from "./CustomerCartBar";

// state management
import { connect } from "react-redux";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: ".3rem",
    margin: "1rem .3rem 9rem .3rem",
  },
});

const MenuItem = (props) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.container}>
        {props.menu.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
      {props.cart.length > 0 ? <CustomerCartBar /> : null}
    </>
  );
};

const mapStateToProps = ({ menu, cart }) => ({ menu, cart });

export default connect(mapStateToProps)(MenuItem);
