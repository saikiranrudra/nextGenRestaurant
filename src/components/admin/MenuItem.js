import React, { useState } from "react";

//components
import { Button, Typography } from "@material-ui/core";

//State Management
// import { connect } from "react-redux";
//Action
// import { updateMenuItemFeatured } from "./../../actions/admin/index";

//icon
import edit from "./../..//assets/dashboardAssets/edit.svg";
import StarIcon from "@material-ui/icons/Star";

//styling
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "110px 1fr",
    margin: ".5rem 0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImg: {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "110px",
    borderRadius: "5px",
    margin: ".3rem",
  },
  cardContent: {
    display: "grid",
    gridTemplateColumns: "1fr 80px",
    alignItems: "center",
  },
  editBtn: {
    padding: ".3rem .8rem",
    fontSize: ".8rem",
    fontWeight: "bold",
    backgroundColor: "#fff",
    margin: ".5rem 0 0 0",
  },
  cardContentText: {
    marginLeft: ".8rem",
  },
  id: {
    fontFamily: "Product-Sans",
    fontSize: ".8rem",
    marginTop: ".3rem",
  },
  name: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    marginTop: ".1rem",
  },
  category: {
    fontFamily: "Product-Sans",
    fontSize: ".8rem",
  },
  mealFor: {
    fontFamily: "Product-Sans",
    fontSize: ".9rem",
    marginTop: ".3rem",
  },
  itemVisibility: {
    color: theme.palette.primary.main,
    fontSize: ".8rem",
    fontWeight: "bold",
    fontFamily: "Product-Sans",
  },
  featured: {
    display: "flex",
    flexDirection: "column",
    marginTop: ".3rem",
    alignItems: "center",
    cursor: "pointer",
  },
  price: {
    fontFamily: "Product-Sans",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
}));

const MenuItem = (props) => {
  const classes = useStyle();
  const [featured, setFeatured] = useState("Featured");

  const handleFeatured = (item, updateMenuItemFeatured) => {
    // item.featured = item.featured ? false : true;
    setFeatured("please wait...");
    // updateMenuItemFeatured(item);
    setFeatured("Featured");
  };

  return (
    <div
      className={classes.cardContainer}
      style={{ backgroundColor: !props.item.visible ? "#D9D9D9" : null }}
    >
      <div
        className={classes.cardImg}
        style={{ backgroundImage: `url("${props.item.img}")` }}
      >
        {/* <img src={props.item.img} alt="item" style={{ width: "100%" }} /> */}
      </div>
      <div className={classes.cardContent}>
        <div className={classes.cardContentText}>
          <Typography variant="body1" align="left" className={classes.id}>
            {props.item.id}
          </Typography>

          <Typography variant="body1" align="left" className={classes.name}>
            {props.item.name}
          </Typography>

          <Typography variant="body1" align="left" className={classes.category}>
            {props.item.category.toString()}
          </Typography>

          <Typography variant="body1" align="left" className={classes.mealFor}>
            Meal for {props.item.mealFor}
          </Typography>

          <Typography
            variant="body1"
            align="left"
            className={classes.itemVisibility}
          >
            {props.item.visible ? "On Menu" : "Not on Menu"}
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            endIcon={<img src={edit} alt="edit" style={{ width: "1rem" }} />}
            className={classes.editBtn}
          >
            Edit
          </Button>
          <div
            className={classes.featured}
            onClick={() => {
              handleFeatured(props.item, props.updateMenuItemFeatured);
            }}
          >
            <StarIcon
              style={{ fill: props.item.featured ? "#FC6565" : "#989898" }}
            />
            <Typography
              variant="body2"
              style={{ fontSize: "0.7rem", fontFamily: "Product-Sans" }}
            >
              {featured}
            </Typography>

            {props.item.jainCount !== undefined ? (
              <Typography
                variant="body2"
                style={{ fontSize: "0.8rem", fontFamily: "Product-Sans" }}
              >
                Jain Available
              </Typography>
            ) : null}

            <Typography variant="body2" className={classes.price}>
              {props.item.price}₹
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
// const mapStateToProps = () => ({});
// export default connect(mapStateToProps, { updateMenuItemFeatured })(MenuItem);
