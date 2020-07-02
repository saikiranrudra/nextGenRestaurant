import React, { useState, useEffect } from "react";

// Components
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Counter from "./Counter";

// icons
import { MoreVert } from "@material-ui/icons";

// state Mangement
import { connect } from "react-redux";
//actions
import { updateMenu, updateCart } from "./../../actions/customer";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  img: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "4rem",
    height: "4rem",
  },
  card: {
    backgroundColor: "#f5f5f5",
    display: "inline-block",
    padding: ".6rem",
    borderRadius: "4px",
  },
  title: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
  rating: {
    margin: 0,
    padding: 0,
  },
  meal: {
    fontFamily: "Product-Sans",
  },
  price: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
  rupee: {
    fontSize: "1.3rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "right",
  },
});

const ItemCard = (props) => {
  const classes = useStyle();
  const [normalCount, setNormalCount] = useState(0);
  const [jainCount, setJainCount] = useState(0);
  const { updateMenu, updateCart, item } = props;

  useEffect(() => {
    let t = item;
    if (item.normalCount !== undefined && item.jainCount !== undefined) {
      t.normalCount = normalCount;
      t.jainCount = jainCount;
      updateMenu(t);
      updateCart(t);
    }
    if (item.normalCount !== undefined && item.jainCount === undefined) {
      t.normalCount = normalCount;
      updateMenu(t);
      updateCart(t);
    }
    if (item.normalCount === undefined && item.jainCount !== undefined) {
      t.jainCount = jainCount;
      updateMenu(t);
      updateCart(t);
    }
  }, [normalCount, jainCount, updateMenu, updateCart, item]);

  return (
    <div className={classes.card}>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <Paper
              style={{ backgroundImage: `url("${props.item.img}")` }}
              className={classes.img}
            ></Paper>
          </div>
          <Typography variant="h6" align="left" className={classes.title}>
            {props.item.name}
          </Typography>
          <Box
            component="fieldset"
            className={classes.rating}
            mb={3}
            borderColor="transparent"
          >
            <Rating name="read-only" value={props.item.rating} readOnly />
          </Box>
          <Typography variant="body2" align="left" className={classes.meal}>
            Meal for {props.item.mealFor}
          </Typography>
          <Typography variant="body1" align="left" className={classes.price}>
            {props.item.price}
            <span className={classes.rupee}>₹</span>
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <div className={classes.container}>
            <MoreVert style={{ marginLeft: "auto" }} />
            {item.jainCount !== undefined ? (
              <div>
                <Typography variant="body2" align="right">
                  Jain
                </Typography>
                <Counter count={jainCount} setCount={setJainCount} />
              </div>
            ) : null}

            {item.normalCount !== undefined ? (
              <div
                style={{
                  marginTop:
                    props.item.jainCount !== undefined ? "5rem" : "8rem",
                }}
              >
                <Counter count={normalCount} setCount={setNormalCount} />
              </div>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });
export default connect(mapStateToProps, { updateMenu, updateCart })(ItemCard);
