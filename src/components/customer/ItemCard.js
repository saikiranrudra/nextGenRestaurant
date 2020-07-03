import React, { useState, useEffect } from "react";

// Components
import { Paper, Grid, Typography, Box, Drawer } from "@material-ui/core";
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
  moreImg: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    width: "8rem",
    height: "8rem",
  },
  drawer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    margin: "1rem",
  },
  drawerStyle: {
    "& > .makeStyles-drawerStyle-55": {
      zIndex: "15000",
    },
    "& > .MuiDrawer-paper ": {
      borderRadius: "1rem 1rem 0 0",
    },
  },
  drawerText: {
    gridColumn: "span 2",
  },
  drawerTitle: {
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
});

const ItemCard = (props) => {
  const classes = useStyle();
  const [normalCount, setNormalCount] = useState(0);
  const [jainCount, setJainCount] = useState(0);
  const [more, setMore] = useState(false);
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
            <MoreVert
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setMore(true);
              }}
            />

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

      <Drawer
        anchor="bottom"
        open={more}
        className={classes.drawerStyle}
        onClose={() => {
          setMore(false);
        }}
      >
        <div className={classes.drawer}>
          <Paper
            className={classes.moreImg}
            style={{ backgroundImage: `url("${props.item.img}")` }}
          ></Paper>
          <div style={{ marginTop: "1rem" }}>
            <Box
              component="fieldset"
              className={classes.rating}
              mb={3}
              borderColor="transparent"
            >
              <Rating name="read-only" value={props.item.rating} readOnly />
            </Box>

            <div>
              <Typography variant="body2" align="left" className={classes.meal}>
                Meal for {props.item.mealFor}
              </Typography>
              <Typography
                variant="body1"
                align="left"
                className={classes.price}
              >
                {props.item.price}
                <span className={classes.rupee}>₹</span>
              </Typography>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {item.jainCount !== undefined ? (
                  <div style={{ marginLeft: "auto" }}>
                    <Typography variant="body2" align="right">
                      Jain
                    </Typography>
                    <Counter count={jainCount} setCount={setJainCount} />
                  </div>
                ) : null}

                {item.normalCount !== undefined ? (
                  <div
                    style={{
                      marginTop: "1rem",
                      marginLeft: "auto",
                    }}
                  >
                    <Counter count={normalCount} setCount={setNormalCount} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={classes.drawerText}>
            <div className={classes.drawerTitle}>
              <Typography
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Product-Sans",
                  fontWeight: "bold",
                }}
                variant="h2"
                align="left"
              >
                {props.item.name}
              </Typography>
            </div>

            <Typography
              style={{
                fontFamily: "Product-Sans",
              }}
              variant="body2"
              align="left"
            >
              {props.item.description}
            </Typography>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = ({ menu }) => ({ menu });
export default connect(mapStateToProps, { updateMenu, updateCart })(ItemCard);
